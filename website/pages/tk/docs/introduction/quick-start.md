---
title: Çalt başlangyç
description: rust-anything-i gurnaň, ony kodlaýyş agentiňiz bilen hasaba alyň we aýlawy ilkinji birlikde işlediň.
---

# Çalt başlangyç

## Gurnamagy agentiňize tabşyryň

Muny Claude Code, Codex, Cursor ýa-da Gemini CLI içine goýuň:

```text
Install rust-anything: run `cargo install rust-anything`, then `rust-anything setup`.
Tell me when to restart you.
```

## Ýa-da özüňiz gurnaň

::: tabs
== cargo
```sh
cargo install rust-anything   # crates.io-dan
rust-anything setup           # ony Claude Code, Codex, Cursor we Gemini CLI bilen hasaba alýar
```
== npm
```sh
npm install -g rust-anything
rust-anything setup
```
:::

Entek Rust toolchain ýokmy? macOS, Linux we Windows üçin taýýar binar faýllar her [GitHub release](https://github.com/erkamyaman/rust-anything/releases) sahypasyna goşulan, JavaScript taslamalary üçin bolsa npm şol bir binar faýly gurnaýar.

`setup` tapan her agentine MCP serweri goşýar we workflow skill-ini agentiň skill-leri okaýan ýerine gurnaýar. Onuň nämeleri üýtgedýändigi üçin [Agentiňizi sazlaň](/docs/introduction/agents) sahypasyna serediň.

## Agentiňizden soraň

- *"Bu CLI-ni rust-anything bilen başdan-aýak Rust-da täzeden ýaz we onuň edil şonuň ýaly işleýändigini subut et."*
- *"Bu gözleg haýal ýaly. Ony rust-anything bilen profille we hot loop-y Rust-a göçür."*
- *"rust-anything bilen `src/parser/` bukjasyny Rust-a geçirmegiň meýilnamasyny düz; birinji birligi geçir we subut et."*
- *"`rust/text-rs` içindäki Rust portuny asyl nusga bilen benchmark arkaly deňeşdir we ony çykarmalymy, aýt."*

## Ýa-da ädimleri özüňiz ýerine ýetiriň

x18n-iň `fuzzyScore` funksiýasyndaky ädimler: `profile` hot loop-y tapýar, `bridge --batch` crate-i döredýär, `gate` geçýär, benchmark bolsa ony TypeScript bilen deňeşdirýär.

```sh
rust-anything profile . -- node bench.mjs              # näme gyzgyn we ony kim çagyrýar
rust-anything bridge . src/fuzzy.ts --batch fuzzyScore:text
# src/port.rs ýazyň (ýa-da agentiňize tabşyryň), soňra:
rust-anything record rust/fuzzy-rs && rust-anything build rust/fuzzy-rs
rust-anything diff rust/fuzzy-rs                       # ýazga alnan her ýagdaý gabat gelmeli
rust-anything bench rust/fuzzy-rs                      # has çaltmy? netije aýdýar
rust-anything gate rust/fuzzy-rs                       # taýýar diýmek şu geçýär diýmek
```

Her ädim [Aýlaw](/docs/concepts/the-loop) sahypasynda düşündirilýär.

::: tip Bir zat ýetmezçilik edende
Runtime, agent sazlamasy ýa-da MCP serwer ýok ýa-da köne bolany sebäpli bir ädim şowsuz bolsa, [`rust-anything doctor`](/docs/introduction/doctor) işlediň.
:::
