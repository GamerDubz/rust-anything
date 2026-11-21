---
title: エージェントの設定
description: rust-anything setup は MCP サーバーとワークフロースキルを Claude Code、Codex、Cursor、Gemini CLI に登録します。
---

# エージェントの設定

```sh
rust-anything setup
```

`setup` は見つかった各エージェントに MCP サーバーを追加し、エージェントがスキルを読み込む場所にワークフロースキルをインストールします。他の設定は保持され、何度実行しても安全で、`--remove` で元に戻せます。

## 対応エージェント

| エージェント | `rust-anything setup` が追加する内容 |
| --- | --- |
| Claude Code | `~/.claude.json` の MCP サーバー、`~/.claude/skills/` のスキル |
| Codex | `~/.codex/config.toml` の MCP サーバー、`~/.codex/skills/` のスキル |
| Cursor | `~/.cursor/mcp.json` の MCP サーバー |
| Gemini CLI | `~/.gemini/settings.json` の MCP サーバー |
| その他の MCP クライアント | 手動で `rust-anything mcp` を stdio サーバーとして追加（下記参照） |

既存のファイルを変更する前に、`setup` は同じ場所にコピー（`<file>.rust-anything.bak`）を保存します。`setup --remove` は rust-anything のエントリだけを取り除きます。保存したコピーは、あなたが削除するまで残ります。

## MCP サーバー

`rust-anything mcp` は、すべてのステップを stdio 経由の MCP ツールとして提供します: `profile`、`analyze`、`bridge`、`refresh`、`record`、`build`、`diff`、`bench`、`shadow`、`gate`、そしてアプリ全体向けの `app_record`、`app_replay`、`app_front_door`、`app_wire`、`app_lift` です。各ツール、そのパラメータ、触れる可能性のあるもの: [MCP ツール](/docs/reference/mcp-tools)。サーバーはスキルから作られた 2 つのプロンプト、`port_unit` と `port_whole_app` も提供します。

代わりに 1 つのプロジェクトに手動で MCP サーバーを追加するには:

**.mcp.json**
```json
{ "mcpServers": { "rust-anything": { "command": "rust-anything", "args": ["mcp"] } } }
```

## スキル

ワークフロースキル（[`skills/rust-anything/SKILL.md`](https://github.com/erkamyaman/rust-anything/blob/main/skills/rust-anything/SKILL.md)）は、エージェントにループの回し方を指示します: プロファイルを取り、計画を立てて承認を待ち、1 つのユニットを移植し、それを証明し、シャドウの背後で出荷し、`gate` に合格したときだけ完了とします。アプリ全体の場合は [`whole-app.md`](https://github.com/erkamyaman/rust-anything/blob/main/skills/rust-anything/whole-app.md) に従います。[アプリ全体の移植](/docs/whole-apps/overview)を参照してください。

## Claude Code プラグイン

```text
/plugin install rust-anything --marketplace erkamyaman/rust-anything
```

プラグインには MCP サーバーとスキルが含まれます。CLI が `PATH` に通っている必要があります。
