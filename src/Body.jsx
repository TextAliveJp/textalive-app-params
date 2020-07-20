import React, { useEffect, useState, createRef, useMemo } from "react";
import { Player } from "textalive-api";

import { PlayerControl } from "./PlayerControl";

const defaultFontSize = 70;
const defaultColor = "#1f4391";

const sansSerif = `"Hiragino Kaku Gothic Pro", "游ゴシック体", "Yu Gothic", YuGothic, Meiryo, HelveticaNeue, "Helvetica Neue", Helvetica, Arial, sans-serif`;
const serif = `"Times New Roman", YuMincho, "Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif`;

export const Body = () => {
  const [player, setPlayer] = useState(null);
  const [app, setApp] = useState(null);
  const [char, setChar] = useState("");
  const [fontFamily, setFontFamily] = useState(sansSerif);
  const [fontSize, setFontSize] = useState(defaultFontSize);
  const [color, setColor] = useState(defaultColor);
  const [darkMode, setDarkMode] = useState(false);

  const ref = createRef();
  const mediaElement = useMemo(() => <div className="media" ref={ref} />, []);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) {
      return;
    }

    console.log("--- [app] create Player instance ---");
    const p = new Player({
      app: {
        appName: "Basic app",
        appAuthor: "Jun Kato",
        parameters: [
          {
            title: "フォントの種類",
            name: "fontFamily",
            className: "Select",
            params: [
              [serif, "明朝体"],
              [sansSerif, "ゴシック体"],
            ],
            initialValue: sansSerif,
          },
          {
            title: "フォントサイズ",
            name: "fontSize",
            className: "Slider",
            params: [0, 100],
            initialValue: defaultFontSize,
          },
          {
            title: "テキスト色",
            name: "color",
            className: "Color",
            initialValue: defaultColor,
          },
          {
            title: "ダークモード",
            name: "darkMode",
            className: "Check",
            initialValue: false,
          },
        ],
      },
      mediaElement: ref.current,
      fontFamilies: [], // don't load fonts
    });

    const playerListener = {
      onAppReady: (app) => {
        console.log("--- [app] initialized as TextAlive app ---");
        console.log("managed:", app.managed);
        console.log("host:", app.host);
        console.log("song url:", app.songUrl);
        if (!app.songUrl) {
          p.createFromSongUrl("http://piapro.jp/t/C0lr/20180328201242");
        }
        setApp(app);
      },
      onAppParameterUpdate: (name, value) => {
        console.log(`[app] parameters.${name} update:`, value);
        if (name === "fontFamily") {
          setFontFamily(value);
        }
        if (name === "fontSize") {
          setFontSize(value);
        }
        if (name === "color") {
          const color = value;
          setColor(`rgb(${color.r}, ${color.g}, ${color.b})`);
        }
        if (name === "darkMode") {
          setDarkMode(!!value);
        }
      },
      onVideoReady: () => {
        console.log("--- [app] video is ready ---");
        console.log("player:", p);
        console.log("player.data.song:", p.data.song);
        console.log("player.data.song.name:", p.data.song.name);
        console.log("player.data.song.artist.name:", p.data.song.artist.name);
        console.log("player.data.songMap:", p.data.songMap);
        let c = p.video.firstChar;
        while (c && c.next) {
          c.animate = (now, u) => {
            if (u.startTime <= now && u.endTime > now) {
              setChar(u.text);
            }
          };
          c = c.next;
        }
      },
    };
    p.addListener(playerListener);

    setPlayer(p);
    return () => {
      console.log("--- [app] shutdown ---");
      p.removeListener(playerListener);
      p.dispose();
    };
  }, [ref.current]);

  return (
    <>
      {player && app && (
        <div className="controls">
          <PlayerControl disabled={app.managed} player={player} />
        </div>
      )}
      <div
        className="wrapper"
        style={{
          background: darkMode ? "#333" : "#fff",
        }}
      >
        <div
          className="char"
          style={{
            fontFamily,
            fontSize: `${fontSize}vh`,
            color,
          }}
        >
          {char}
        </div>
      </div>
      {mediaElement}
    </>
  );
};
