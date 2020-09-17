# TextAlive App API params example

React を使った作例で、発声中の文字を表示します。TextAlive ホストと接続されていれば、フォントや配色などを調整可能です。

デモページ: https://textalivejp.github.io/textalive-app-params/

TextAlive ホストと接続された状態をテストするには [TextAlive App Debugger](https://developer.textalive.jp/app/run/?ta_app_url=https%3A%2F%2Ftextalivejp.github.io%2Ftextalive-app-params%2F&ta_song_url=http%3A%2F%2Fpiapro.jp%2Ft%2FC0lr%2F20180328201242) のページにアクセスしてください。

## 違う楽曲で試すには

TextAlive App API で開発された Web アプリケーションは、（特定の楽曲向けに作り込んでいない限り）URL のクエリパラメタで `ta_song_url={楽曲のURL}` を指定すると異なる楽曲で演出を試せます。

- [愛されなくても君がいる by ピノキオピー feat. 初音ミク](https://textalivejp.github.io/textalive-app-params/?ta_song_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DygY2qObZv24)
- [ブレス・ユア・ブレス by 和田たけあき feat. 初音ミク](https://textalivejp.github.io/textalive-app-params/?ta_song_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Da-Nf3QUFkOU)
- [グリーンライツ・セレナーデ by Omoi feat. 初音ミク](https://textalivejp.github.io/textalive-app-params/?ta_song_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DXSLhsjepelI)

## 開発

[Node.js](https://nodejs.org/) をインストールしている環境で以下のコマンドを実行すると、開発用サーバが起動します。

```sh
npm install
npm run dev
```

## ビルド

以下のコマンドで `docs` 以下にビルド済みファイルが生成されます。 [サンプルコードのデモページ](https://textalivejp.github.io/textalive-app-params/) は [GitHub Pages](https://pages.github.com/) で、このリポジトリの `docs` 以下のファイルが提供されています。

```sh
npm run build
```

## TextAlive App API

![TextAlive](https://i.gyazo.com/thumb/1000/5301e6f642d255c5cfff98e049b6d1f3-png.png)

TextAlive App API は、音楽に合わせてタイミングよく歌詞が動く Web アプリケーション（リリックアプリ）を開発できる JavaScript 用のライブラリです。

TextAlive App API について詳しくは Web サイト [TextAlive for Developers](https://developer.textalive.jp/) をご覧ください。

---

https://github.com/TextAliveJp/textalive-app-params
