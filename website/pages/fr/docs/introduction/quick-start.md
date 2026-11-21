---
title: Démarrage rapide
description: Installez rust-anything, enregistrez-le auprès de votre agent de code et lancez la boucle sur une première unité.
---

# Démarrage rapide

## Laissez votre agent l'installer

Collez ceci dans Claude Code, Codex, Cursor ou Gemini CLI :

```text
Install rust-anything: run `cargo install rust-anything`, then `rust-anything setup`.
Tell me when to restart you.
```

## Ou installez-le vous-même

::: tabs
== cargo
```sh
cargo install rust-anything   # depuis crates.io
rust-anything setup           # l'enregistre auprès de Claude Code, Codex, Cursor et Gemini CLI
```
== npm
```sh
npm install -g rust-anything
rust-anything setup
```
:::

Pas encore de toolchain Rust ? Des binaires précompilés pour macOS, Linux et Windows sont joints à chaque [release GitHub](https://github.com/erkamyaman/rust-anything/releases), et pour les projets JavaScript, npm installe le même binaire.

`setup` ajoute le serveur MCP à chaque agent qu'il trouve et installe le skill de workflow là où l'agent lit ses skills. Voir [Configurer votre agent](/docs/introduction/agents) pour savoir ce qu'il modifie.

## Demandez à votre agent

- *« Réécris cette CLI en Rust avec rust-anything, de bout en bout, et prouve qu'elle se comporte pareil. »*
- *« Cette recherche paraît lente. Profile-la avec rust-anything et déplace la boucle chaude en Rust. »*
- *« Planifie une migration de `src/parser/` vers Rust avec rust-anything ; porte la première unité et prouve-la. »*
- *« Lance un bench du portage Rust dans `rust/text-rs` contre l'original et dis-moi s'il faut le livrer. »*

## Ou lancez les étapes vous-même

Les étapes sur le `fuzzyScore` de x18n : `profile` trouve la boucle chaude, `bridge --batch` génère la crate, `gate` passe, et le benchmark la compare au TypeScript.

```sh
rust-anything profile . -- node bench.mjs              # ce qui est chaud, et qui l'appelle
rust-anything bridge . src/fuzzy.ts --batch fuzzyScore:text
# écrivez src/port.rs (ou laissez votre agent le faire), puis :
rust-anything record rust/fuzzy-rs && rust-anything build rust/fuzzy-rs
rust-anything diff rust/fuzzy-rs                       # chaque cas enregistré doit correspondre
rust-anything bench rust/fuzzy-rs                      # plus rapide ? le verdict le dit
rust-anything gate rust/fuzzy-rs                       # terminé signifie que ceci passe
```

Chaque étape est expliquée dans [La boucle](/docs/concepts/the-loop).

::: tip Quand il manque quelque chose
Si une étape échoue parce qu'un runtime, la configuration de l'agent ou le serveur MCP est absent ou obsolète, lancez [`rust-anything doctor`](/docs/introduction/doctor).
:::
