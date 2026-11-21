---
title: ライブラリ
description: ライブラリにはリプレイするプロセスがありません。公開 API がフロントドアであり、各ユニットの記録ケースが証明になります。
---

# ライブラリ

ライブラリにはリプレイするプロセスがありません: 公開 API がフロントドアであり、各ユニットの記録
ケースが証明になります。

```sh
rust-anything app front-door .        # rust/app: 公開 API を持つ Rust クレート
# 各ユニットでループを実行: bridge、record、port.rs、build、diff、gate。その後:
rust-anything app wire . textkit-rs   # rust/app から再エクスポート。元の実装はそのシャドウをインポートする
rust-anything app replay .            # ワイヤリングした全ユニットのケース。フォールバック = まだ元の実装にあるエクスポート
rust-anything app lift .
```

- `app front-door` は、リポジトリに `main` もサーバーもない場合（それ以外の場合は `--library`）に公開 API（全ユニットのエクスポート）を見つけ、
  `rust/app` をライブラリクレートとして生成します。ワイヤリングした各
  ユニットはそのモジュールになります: `pub use textkit_rs::port as textkit;`。
- `app wire` は `bridge` で作られたクレートを受け取り、`gate` を実行し、ユニットのシャドウの差し替え用モジュールを書き出します:
  元のパッケージはユニットの代わりにそれをインポートするので、呼び出し元は元の API のまま
  Rust に到達します。`RUST_ANYTHING_UNIT_<NAME>=original` でユニットを元に戻せます（C: シャドウのフラグなしで
  ビルド）。
- `app replay` は、ワイヤリングした全ユニットの記録ケースをそのバインディング経由で実行します。フォールバック率は、
  Rust がまだ応答していない公開エクスポートの割合です: ワイヤリングされていないユニットと、`bridge` が元の言語に
  残したエクスポートです。
- `app lift` はフォールバック 0 と全ユニットの `gate` 合格を必要とします。ユニットからバインディング、ラッパー、
  シャドウを取り除き、`rust/app` を 1 つの純粋な Rust ライブラリとして残します。`port.rs` には
  一切触れないので、バインディング経由で一致したケースは引き続きそれを記述しています。チェックリストは
  まだシャドウをインポートしている元の実装のファイルについて警告します。

5 つすべてが MCP ツールでもあります: `app_record`、`app_replay`、`app_front_door`、`app_wire`、
`app_lift`。
