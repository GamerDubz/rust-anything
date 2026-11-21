---
title: Агентны көйләү
description: rust-anything setup MCP серверны һәм workflow skill'ны Claude Code, Codex, Cursor һәм Gemini CLI'да теркәп куя.
---

# Агентны көйләү

```sh
rust-anything setup
```

`setup` тапкан һәр агентка MCP серверны өсти һәм workflow skill'ны агент skill'ларны укыган урынга урнаштыра. Ул сезнең башка көйләнмәләрегезне саклый, аны кабат җибәрү куркынычсыз, ә `--remove` аны кире кайтара.

## Кайсы агентлар белән эшли

| Агент | `rust-anything setup` нәрсә өсти |
| --- | --- |
| Claude Code | `~/.claude.json` эчендә MCP сервер, `~/.claude/skills/` эчендә skill |
| Codex | `~/.codex/config.toml` эчендә MCP сервер, `~/.codex/skills/` эчендә skill |
| Cursor | `~/.cursor/mcp.json` эчендә MCP сервер |
| Gemini CLI | `~/.gemini/settings.json` эчендә MCP сервер |
| Башка теләсә нинди MCP клиент | `rust-anything mcp` командасын stdio сервер итеп кулдан өстәгез (түбәндә) |

Булган файлны үзгәртер алдыннан `setup` аның күчермәсен янәшәдә саклый (`<file>.rust-anything.bak`). `setup --remove` rust-anything язмаларын гына алып ташлый; ул саклаган күчермәләр сез аларны бетергәнче кала.

## MCP сервер

`rust-anything mcp` һәр адымны stdio аша MCP коралы итеп тәкъдим итә: `profile`, `analyze`, `bridge`, `refresh`, `record`, `build`, `diff`, `bench`, `shadow`, `gate`, ә бөтен кушымта өчен `app_record`, `app_replay`, `app_front_door`, `app_wire`, `app_lift`. Һәр корал, аның параметрлары һәм ул нәрсәгә кагыла ала: [MCP кораллары](/docs/reference/mcp-tools). Сервер шулай ук skill нигезендә төзелгән ике prompt тәкъдим итә: `port_unit` һәм `port_whole_app`.

MCP серверны бер проектка кулдан өстәргә теләсәгез:

**.mcp.json**
```json
{ "mcpServers": { "rust-anything": { "command": "rust-anything", "args": ["mcp"] } } }
```

## Skill

Workflow skill ([`skills/rust-anything/SKILL.md`](https://github.com/erkamyaman/rust-anything/blob/main/skills/rust-anything/SKILL.md)) агентка циклны ничек алып барырга кирәклеген әйтә: профильләү, планлаштыру һәм раслау өчен туктау, бер берәмлекне күчерү, аны исбатлау, shadow артында чыгару һәм `gate` узгач кына эшне тәмам дип санау. Бөтен кушымта өчен ул [`whole-app.md`](https://github.com/erkamyaman/rust-anything/blob/main/skills/rust-anything/whole-app.md) буенча эшли; [Бөтен кушымтаны күчерү](/docs/whole-apps/overview) битен карагыз.

## Claude Code плагины

```text
/plugin install rust-anything --marketplace erkamyaman/rust-anything
```

Плагин MCP серверны һәм skill'ны китерә; CLI сезнең `PATH` эчендә булырга тиеш.
