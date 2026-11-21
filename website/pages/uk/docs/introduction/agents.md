---
title: Налаштування агента
description: rust-anything setup реєструє сервер MCP і навичку робочого процесу в Claude Code, Codex, Cursor і Gemini CLI.
---

# Налаштування агента

```sh
rust-anything setup
```

`setup` додає сервер MCP до кожного агента, якого знаходить, і встановлює навичку робочого процесу туди, звідки агент читає навички. Інші ваші налаштування він не чіпає, його безпечно запускати повторно, а `--remove` скасовує зміни.

## Працює з

| Агент | Що додає `rust-anything setup` |
| --- | --- |
| Claude Code | сервер MCP у `~/.claude.json`, навичку в `~/.claude/skills/` |
| Codex | сервер MCP у `~/.codex/config.toml`, навичку в `~/.codex/skills/` |
| Cursor | сервер MCP у `~/.cursor/mcp.json` |
| Gemini CLI | сервер MCP у `~/.gemini/settings.json` |
| Будь-який інший клієнт MCP | додайте `rust-anything mcp` як stdio-сервер вручну (нижче) |

Перш ніж змінити наявний файл, `setup` зберігає його копію поруч (`<file>.rust-anything.bak`). `setup --remove` прибирає лише записи rust-anything; збережені копії лишаються, доки ви їх не видалите.

## Сервер MCP

`rust-anything mcp` надає кожен крок як інструмент MCP через stdio: `profile`, `analyze`, `bridge`, `refresh`, `record`, `build`, `diff`, `bench`, `shadow`, `gate`, а для цілого застосунку `app_record`, `app_replay`, `app_front_door`, `app_wire`, `app_lift`. Усі інструменти, їхні параметри і те, що вони можуть змінювати: [Інструменти MCP](/docs/reference/mcp-tools). Сервер також пропонує два промпти, `port_unit` і `port_whole_app`, складені з навички.

Щоб натомість додати сервер MCP вручну до одного проєкту:

**.mcp.json**
```json
{ "mcpServers": { "rust-anything": { "command": "rust-anything", "args": ["mcp"] } } }
```

## Навичка

Навичка робочого процесу ([`skills/rust-anything/SKILL.md`](https://github.com/erkamyaman/rust-anything/blob/main/skills/rust-anything/SKILL.md)) пояснює агенту, як проходити цикл: профілювати, скласти план і зупинитися для схвалення, портувати один модуль, довести його правильність, випустити за shadow і вважати роботу завершеною лише тоді, коли проходить `gate`. Для цілого застосунку вона дотримується [`whole-app.md`](https://github.com/erkamyaman/rust-anything/blob/main/skills/rust-anything/whole-app.md); див. [Портування цілого застосунку](/docs/whole-apps/overview).

## Плагін для Claude Code

```text
/plugin install rust-anything --marketplace erkamyaman/rust-anything
```

Плагін приносить сервер MCP і навичку; CLI має бути у вашому `PATH`.
