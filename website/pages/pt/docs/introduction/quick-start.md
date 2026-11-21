---
title: Início rápido
description: Instale o rust-anything, registe-o no seu agente de programação e execute o ciclo numa primeira unidade.
---

# Início rápido

## Deixe o seu agente instalá-lo

Cole isto no Claude Code, Codex, Cursor ou Gemini CLI:

```text
Install rust-anything: run `cargo install rust-anything`, then `rust-anything setup`.
Tell me when to restart you.
```

## Ou instale-o você mesmo

::: tabs
== cargo
```sh
cargo install rust-anything   # a partir do crates.io
rust-anything setup           # regista-o no Claude Code, Codex, Cursor e Gemini CLI
```
== npm
```sh
npm install -g rust-anything
rust-anything setup
```
:::

Ainda não tem a toolchain do Rust? Os binários pré-compilados para macOS, Linux e Windows estão anexados a cada [lançamento no GitHub](https://github.com/erkamyaman/rust-anything/releases) e, para projetos JavaScript, o npm instala o mesmo binário.

O `setup` adiciona o servidor MCP a cada agente que encontrar e instala a skill do fluxo de trabalho no local onde o agente lê as skills. Consulte [Configurar o seu agente](/docs/introduction/agents) para saber o que altera.

## Peça ao seu agente

- *"Reescreve esta CLI em Rust com o rust-anything, do princípio ao fim, e prova que se comporta da mesma forma."*
- *"Esta pesquisa parece lenta. Faz o profiling com o rust-anything e passa o ciclo crítico para Rust."*
- *"Planeia uma migração de `src/parser/` para Rust com o rust-anything; migra a primeira unidade e prova-a."*
- *"Faz o benchmark da migração para Rust em `rust/text-rs` face ao original e diz-me se devo entregá-la."*

## Ou execute as etapas você mesmo

As etapas no `fuzzyScore` do x18n: o `profile` encontra o ciclo crítico, o `bridge --batch` gera o crate, o `gate` passa e o benchmark compara-o com o TypeScript.

```sh
rust-anything profile . -- node bench.mjs              # o que é crítico, e quem o chama
rust-anything bridge . src/fuzzy.ts --batch fuzzyScore:text
# escreva src/port.rs (ou deixe o seu agente fazê-lo) e depois:
rust-anything record rust/fuzzy-rs && rust-anything build rust/fuzzy-rs
rust-anything diff rust/fuzzy-rs                       # cada caso registado tem de coincidir
rust-anything bench rust/fuzzy-rs                      # mais rápido? o veredicto diz
rust-anything gate rust/fuzzy-rs                       # concluído significa que isto passa
```

Cada etapa é explicada em [O ciclo](/docs/concepts/the-loop).

::: tip Quando falta alguma coisa
Se uma etapa falhar porque um runtime, a configuração do agente ou o servidor MCP está em falta ou desatualizado, execute [`rust-anything doctor`](/docs/introduction/doctor).
:::
