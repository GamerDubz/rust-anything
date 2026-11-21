---
title: Quick start
description: Install rust-anything, register it with your coding agent, and run the loop on a first unit.
---

# Quick start

## Let your agent install it

Paste this into Claude Code, Codex, Cursor or Gemini CLI:

```text
Install rust-anything: run `cargo install rust-anything`, then `rust-anything setup`.
Tell me when to restart you.
```

## Or install it yourself

::: tabs
== cargo
```sh
cargo install rust-anything   # from crates.io
rust-anything setup           # registers it with Claude Code, Codex, Cursor and Gemini CLI
```
== npm
```sh
npm install -g rust-anything
rust-anything setup
```
:::

No Rust toolchain yet? Prebuilt binaries for macOS, Linux and Windows are attached to each [GitHub release](https://github.com/erkamyaman/rust-anything/releases), and for JavaScript projects npm installs the same binary.

`setup` adds the MCP server to each agent it finds and installs the workflow skill where the agent reads skills. See [Set up your agent](/docs/introduction/agents) for what it changes.

## Ask your agent

- *"Rewrite this CLI in Rust with rust-anything, end to end, and prove it behaves the same."*
- *"This search feels slow. Profile it with rust-anything and move the hot loop to Rust."*
- *"Plan a migration of `src/parser/` to Rust with rust-anything; port the first unit and prove it."*
- *"Bench the Rust port in `rust/text-rs` against the original and tell me whether to ship it."*

## Or run the steps yourself

The steps on x18n's `fuzzyScore`: `profile` finds the hot loop, `bridge --batch` generates the crate, `gate` passes, and the benchmark compares it with the TypeScript.

```sh
rust-anything profile . -- node bench.mjs              # what is hot, and who calls it
rust-anything bridge . src/fuzzy.ts --batch fuzzyScore:text
# write src/port.rs (or let your agent), then:
rust-anything record rust/fuzzy-rs && rust-anything build rust/fuzzy-rs
rust-anything diff rust/fuzzy-rs                       # every recorded case must match
rust-anything bench rust/fuzzy-rs                      # faster? the verdict says
rust-anything gate rust/fuzzy-rs                       # done means this passes
```

Each step is explained in [The loop](/docs/concepts/the-loop).

::: tip When something is missing
If a step fails because a runtime, the agent setup or the MCP server is missing or out of date, run [`rust-anything doctor`](/docs/introduction/doctor).
:::
