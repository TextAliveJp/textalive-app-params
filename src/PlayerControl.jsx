import React, { useCallback, useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { PlayerSeekbar } from "textalive-react-api";

export const PlayerControl = ({ disabled, player }) => {
  const [status, setStatus] = useState("stop");

  useEffect(() => {
    const listener = {
      onPlay: () => setStatus("play"),
      onPause: () => setStatus("pause"),
      onStop: () => setStatus("stop"),
    };
    player.addListener(listener);
    return () => player.removeListener(listener);
  }, [player]);

  const handlePlay = useCallback(() => player && player.requestPlay(), [
    player,
  ]);
  const handlePause = useCallback(() => player && player.requestPause(), [
    player,
  ]);
  const handleStop = useCallback(() => player && player.requestStop(), [
    player,
  ]);

  return (
    <div className="control">
      <Button
        content={status !== "play" ? "再生" : "一時停止"}
        onClick={status !== "play" ? handlePlay : handlePause}
        size="small"
        disabled={disabled}
      />
      <Button
        content="停止"
        onClick={handleStop}
        size="small"
        disabled={disabled || status === "stop"}
      />
      <div className="seekbar">
        <PlayerSeekbar player={!disabled && player} />
      </div>
    </div>
  );
};
