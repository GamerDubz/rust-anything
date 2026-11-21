---
title: Тиз башлау
description: rust-anything'ны урнаштыру, аны программалау агентыгызда теркәү һәм беренче берәмлектә циклны җибәрү.
---

# Тиз башлау

## Агентыгыз урнаштырсын

Моны Claude Code, Codex, Cursor яки Gemini CLI эченә куегыз:

```text
Install rust-anything: run `cargo install rust-anything`, then `rust-anything setup`.
Tell me when to restart you.
```

## Яки үзегез урнаштырыгыз

::: tabs
== cargo
```sh
cargo install rust-anything   # crates.io'дан
rust-anything setup           # аны Claude Code, Codex, Cursor һәм Gemini CLI'да теркәп куя
```
== npm
```sh
npm install -g rust-anything
rust-anything setup
```
:::

Әле Rust toolchain юкмы? macOS, Linux һәм Windows өчен әзер бинар файллар һәр [GitHub релизына](https://github.com/erkamyaman/rust-anything/releases) беркетелгән, ә JavaScript проектлары өчен npm шул ук бинар файлны урнаштыра.

`setup` тапкан һәр агентка MCP серверны өсти һәм workflow skill'ны агент skill'ларны укыган урынга урнаштыра. Ул нәрсәне үзгәртүен [Агентны көйләү](/docs/introduction/agents) битеннән карагыз.

## Агентыгыздан сорагыз

- *"Бу CLI'ны rust-anything ярдәмендә башыннан ахырына кадәр Rust телендә яңадан яз һәм аның шулай ук эшләвен исбатла."*
- *"Бу эзләү әкрен кебек. Аны rust-anything белән профильлә һәм кайнар циклны Rust'ка күчер."*
- *"rust-anything белән `src/parser/` папкасын Rust'ка күчерүне планлаштыр; беренче берәмлекне күчер һәм исбатла."*
- *"`rust/text-rs` эчендәге Rust портын оригинал белән бенчмаркта чагыштыр һәм аны чыгарыргамы икәнен әйт."*

## Яки адымнарны үзегез башкарыгыз

x18n'ның `fuzzyScore` функциясендә адымнар: `profile` кайнар циклны таба, `bridge --batch` crate ясый, `gate` уза, ә бенчмарк аны TypeScript белән чагыштыра.

```sh
rust-anything profile . -- node bench.mjs              # нәрсә кайнар һәм аны кем чакыра
rust-anything bridge . src/fuzzy.ts --batch fuzzyScore:text
# src/port.rs языгыз (яки агентка тапшырыгыз), аннары:
rust-anything record rust/fuzzy-rs && rust-anything build rust/fuzzy-rs
rust-anything diff rust/fuzzy-rs                       # язып алынган һәр очрак туры килергә тиеш
rust-anything bench rust/fuzzy-rs                      # тизрәкме? нәтиҗә әйтә
rust-anything gate rust/fuzzy-rs                       # бу узса, эш бетте
```

Һәр адым [Цикл](/docs/concepts/the-loop) битендә аңлатыла.

::: tip Нәрсәдер җитмәгәндә
Runtime, агент көйләнмәләре яки MCP сервер булмаганга яки искергәнгә күрә берәр адым уңышсыз тәмамланса, [`rust-anything doctor`](/docs/introduction/doctor) җибәрегез.
:::
