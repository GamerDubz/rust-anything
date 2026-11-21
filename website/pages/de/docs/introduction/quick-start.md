---
title: Schnellstart
description: Installiere rust-anything, registriere es bei deinem Coding-Agent und durchlaufe den Ablauf mit einer ersten Unit.
---

# Schnellstart

## Lass deinen Agent es installieren

Füge das in Claude Code, Codex, Cursor oder Gemini CLI ein:

```text
Install rust-anything: run `cargo install rust-anything`, then `rust-anything setup`.
Tell me when to restart you.
```

## Oder installiere es selbst

::: tabs
== cargo
```sh
cargo install rust-anything   # von crates.io
rust-anything setup           # registriert es bei Claude Code, Codex, Cursor und Gemini CLI
```
== npm
```sh
npm install -g rust-anything
rust-anything setup
```
:::

Noch keine Rust-Toolchain? Vorkompilierte Binaries für macOS, Linux und Windows hängen an jedem [GitHub-Release](https://github.com/erkamyaman/rust-anything/releases), und für JavaScript-Projekte installiert npm dieselbe Binary.

`setup` fügt den MCP-Server bei jedem gefundenen Agent hinzu und installiert den Workflow-Skill dort, wo der Agent Skills liest. Was es ändert, steht unter [Agent einrichten](/docs/introduction/agents).

## Frag deinen Agent

- *„Schreib diese CLI mit rust-anything komplett in Rust neu und beweise, dass sie sich gleich verhält.“*
- *„Diese Suche fühlt sich langsam an. Profiliere sie mit rust-anything und verlege die heiße Schleife nach Rust.“*
- *„Plane eine Migration von `src/parser/` nach Rust mit rust-anything; portiere die erste Unit und beweise sie.“*
- *„Benchmarke die Rust-Portierung in `rust/text-rs` gegen das Original und sag mir, ob ich sie ausliefern soll.“*

## Oder führe die Schritte selbst aus

Die Schritte an x18ns `fuzzyScore`: `profile` findet die heiße Schleife, `bridge --batch` erzeugt das Crate, `gate` besteht, und der Benchmark vergleicht es mit dem TypeScript.

```sh
rust-anything profile . -- node bench.mjs              # was heiß ist und wer es aufruft
rust-anything bridge . src/fuzzy.ts --batch fuzzyScore:text
# src/port.rs schreiben (oder den Agent lassen), dann:
rust-anything record rust/fuzzy-rs && rust-anything build rust/fuzzy-rs
rust-anything diff rust/fuzzy-rs                       # jeder aufgezeichnete Fall muss übereinstimmen
rust-anything bench rust/fuzzy-rs                      # schneller? das Urteil sagt es
rust-anything gate rust/fuzzy-rs                       # fertig heißt: das besteht
```

Jeder Schritt wird in [Der Ablauf](/docs/concepts/the-loop) erklärt.

::: tip Wenn etwas fehlt
Schlägt ein Schritt fehl, weil eine Runtime, die Agent-Einrichtung oder der MCP-Server fehlt oder veraltet ist, führe [`rust-anything doctor`](/docs/introduction/doctor) aus.
:::
