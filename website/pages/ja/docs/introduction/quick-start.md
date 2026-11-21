---
title: クイックスタート
description: rust-anything をインストールし、コーディングエージェントに登録して、最初のユニットでループを回します。
---

# クイックスタート

## エージェントにインストールさせる

Claude Code、Codex、Cursor、または Gemini CLI に以下を貼り付けてください:

```text
rust-anything をインストールして: `cargo install rust-anything` を実行し、次に `rust-anything setup` を実行してください。
再起動が必要なタイミングを教えてください。
```

## または自分でインストールする

::: tabs
== cargo
```sh
cargo install rust-anything   # crates.io からインストール
rust-anything setup           # Claude Code、Codex、Cursor、Gemini CLI に登録
```
== npm
```sh
npm install -g rust-anything
rust-anything setup
```
:::

Rust ツールチェーンをまだ導入していない場合は、各 [GitHub リリース](https://github.com/erkamyaman/rust-anything/releases)に macOS、Linux、Windows 向けのビルド済みバイナリが添付されています。JavaScript プロジェクトでは npm が同じバイナリをインストールします。

`setup` は見つかった各エージェントに MCP サーバーを追加し、エージェントがスキルを読み込む場所にワークフロースキルをインストールします。何が変更されるかは[エージェントの設定](/docs/introduction/agents)を参照してください。

## エージェントに依頼する

- *"rust-anything を使ってこの CLI をエンドツーエンドで Rust に書き直し、元の実装と同じ挙動であることを証明して。"*
- *"この検索が遅く感じる。rust-anything でプロファイルを取って、ホットループを Rust に移して。"*
- *"rust-anything で `src/parser/` の Rust 移行計画を立てて。最初のユニットを移植して検証して。"*
- *"`rust/text-rs` の Rust 移植版と元の実装をベンチマーク比較して、出荷すべきか教えて。"*

## または自分でステップを実行する

x18n の `fuzzyScore` での手順: `profile` がホットループを見つけ、`bridge --batch` がクレートを生成し、`gate` に合格し、ベンチマークで TypeScript と比較します。

```sh
rust-anything profile . -- node bench.mjs              # どこがホットで、誰が呼んでいるか
rust-anything bridge . src/fuzzy.ts --batch fuzzyScore:text
# src/port.rs を書く（またはエージェントに書かせる）。その後:
rust-anything record rust/fuzzy-rs && rust-anything build rust/fuzzy-rs
rust-anything diff rust/fuzzy-rs                       # 記録されたすべてのケースが一致する必要がある
rust-anything bench rust/fuzzy-rs                      # 速くなったか？判定が教えてくれる
rust-anything gate rust/fuzzy-rs                       # これに合格すれば完了
```

各ステップは[移植ループ](/docs/concepts/the-loop)で説明しています。

::: tip 何かが足りないとき
ランタイム、エージェントの設定、または MCP サーバーがない、あるいは古いためにステップが失敗した場合は、[`rust-anything doctor`](/docs/introduction/doctor) を実行してください。
:::
