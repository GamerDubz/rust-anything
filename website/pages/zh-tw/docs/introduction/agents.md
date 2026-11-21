---
title: 設定你的 AI 代理
description: rust-anything setup 會在 Claude Code、Codex、Cursor 與 Gemini CLI 中註冊 MCP 伺服器與工作流程技能。
---

# 設定你的 AI 代理

```sh
rust-anything setup
```

`setup` 會把 MCP 伺服器加入它找到的每個 AI 代理，並將工作流程技能安裝到該代理讀取技能的位置。它會保留你的其他設定，可以安全地重複執行，而 `--remove` 可以復原變更。

## 支援的 AI 代理

| AI 代理 | `rust-anything setup` 新增的內容 |
| --- | --- |
| Claude Code | MCP 伺服器寫入 `~/.claude.json`，技能放在 `~/.claude/skills/` |
| Codex | MCP 伺服器寫入 `~/.codex/config.toml`，技能放在 `~/.codex/skills/` |
| Cursor | MCP 伺服器寫入 `~/.cursor/mcp.json` |
| Gemini CLI | MCP 伺服器寫入 `~/.gemini/settings.json` |
| 其他任何 MCP 用戶端 | 手動將 `rust-anything mcp` 新增為 stdio 伺服器（見下方） |

在修改已存在的檔案之前，`setup` 會在旁邊儲存一份副本（`<file>.rust-anything.bak`）。`setup --remove` 只會移除 rust-anything 的項目；它儲存的副本會保留，直到你自行刪除。

## MCP 伺服器

`rust-anything mcp` 透過 stdio 將每個步驟提供為 MCP 工具：`profile`、`analyze`、`bridge`、`refresh`、`record`、`build`、`diff`、`bench`、`shadow`、`gate`，以及用於整個應用程式的 `app_record`、`app_replay`、`app_front_door`、`app_wire`、`app_lift`。每個工具、它的參數以及它可能動到的內容：[MCP 工具](/docs/reference/mcp-tools)。伺服器也提供兩個由技能建構的提示：`port_unit` 與 `port_whole_app`。

若要改為手動將 MCP 伺服器加入單一專案：

**.mcp.json**
```json
{ "mcpServers": { "rust-anything": { "command": "rust-anything", "args": ["mcp"] } } }
```

## 技能

工作流程技能（[`skills/rust-anything/SKILL.md`](https://github.com/erkamyaman/rust-anything/blob/main/skills/rust-anything/SKILL.md)）會告訴 AI 代理如何執行工作循環：效能剖析、規劃並停下來等待核准、移植一個單元、證明它正確、以影子模式出貨，並且只有在 `gate` 通過時才算完成。對於整個應用程式，它遵循 [`whole-app.md`](https://github.com/erkamyaman/rust-anything/blob/main/skills/rust-anything/whole-app.md)；請參閱[移植整個應用程式](/docs/whole-apps/overview)。

## Claude Code 外掛

```text
/plugin install rust-anything --marketplace erkamyaman/rust-anything
```

此外掛包含 MCP 伺服器與技能；CLI 必須在你的 `PATH` 上。
