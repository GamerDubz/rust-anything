---
title: Агентиңизди жөндөө
description: rust-anything setup MCP серверди жана workflow skill'ин Claude Code, Codex, Cursor жана Gemini CLI менен каттайт.
---

# Агентиңизди жөндөө

```sh
rust-anything setup
```

`setup` тапкан ар бир агентке MCP серверди кошот жана workflow skill'ин агент skill'дерди окуган жерге орнотот. Ал башка жөндөөлөрүңүздү сактайт, аны кайра иштетүү коопсуз, ал эми `--remove` баарын артка кайтарат.

## Шайкеш агенттер

| Агент | `rust-anything setup` кошкону |
| --- | --- |
| Claude Code | `~/.claude.json` ичинде MCP сервер, `~/.claude/skills/` ичинде skill |
| Codex | `~/.codex/config.toml` ичинде MCP сервер, `~/.codex/skills/` ичинде skill |
| Cursor | `~/.cursor/mcp.json` ичинде MCP сервер |
| Gemini CLI | `~/.gemini/settings.json` ичинде MCP сервер |
| Башка каалаган MCP кардар | `rust-anything mcp` буйругун stdio сервер катары кол менен кошуңуз (төмөндө) |

Бар файлды өзгөртүүдөн мурун `setup` анын көчүрмөсүн жанына сактайт (`<file>.rust-anything.bak`). `setup --remove` rust-anything'тин жазууларын гана алып салат; ал сактаган көчүрмөлөр сиз өчүрмөйүнчө калат.

## MCP сервер

`rust-anything mcp` ар бир кадамды stdio аркылуу MCP куралы катары берет: `profile`, `analyze`, `bridge`, `refresh`, `record`, `build`, `diff`, `bench`, `shadow`, `gate`, ал эми бүт колдонмо үчүн `app_record`, `app_replay`, `app_front_door`, `app_wire`, `app_lift`. Ар бир курал, анын параметрлери жана ал эмнеге тие алары: [MCP куралдары](/docs/reference/mcp-tools). Сервер ошондой эле skill'ден курулган эки prompt сунуштайт: `port_unit` жана `port_whole_app`.

Анын ордуна MCP серверди бир долбоорго кол менен кошуу үчүн:

**.mcp.json**
```json
{ "mcpServers": { "rust-anything": { "command": "rust-anything", "args": ["mcp"] } } }
```

## Skill

Workflow skill ([`skills/rust-anything/SKILL.md`](https://github.com/erkamyaman/rust-anything/blob/main/skills/rust-anything/SKILL.md)) агентке циклди кантип жүргүзүүнү айтат: профилдөө, пландоо жана макулдук үчүн токтоо, бир бирдикти порттоо, аны далилдөө, shadow'дун артында чыгаруу жана `gate` өткөндө гана даяр деп эсептөө. Бүт колдонмо үчүн ал [`whole-app.md`](https://github.com/erkamyaman/rust-anything/blob/main/skills/rust-anything/whole-app.md) боюнча иштейт; [Бүт колдонмону порттоо](/docs/whole-apps/overview) барагын караңыз.

## Claude Code плагини

```text
/plugin install rust-anything --marketplace erkamyaman/rust-anything
```

Плагин MCP серверди жана skill'ди алып келет; CLI сиздин `PATH` ичинде болушу керек.
