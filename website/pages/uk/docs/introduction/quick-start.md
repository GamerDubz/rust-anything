---
title: Швидкий старт
description: Встановіть rust-anything, зареєструйте його у своєму агенті для програмування і пройдіть цикл на першому модулі.
---

# Швидкий старт

## Нехай агент встановить його

Вставте це в Claude Code, Codex, Cursor або Gemini CLI:

```text
Install rust-anything: run `cargo install rust-anything`, then `rust-anything setup`.
Tell me when to restart you.
```

## Або встановіть самі

::: tabs
== cargo
```sh
cargo install rust-anything   # з crates.io
rust-anything setup           # реєструє його в Claude Code, Codex, Cursor і Gemini CLI
```
== npm
```sh
npm install -g rust-anything
rust-anything setup
```
:::

Ще немає тулчейну Rust? Готові бінарники для macOS, Linux і Windows додано до кожного [релізу на GitHub](https://github.com/erkamyaman/rust-anything/releases), а для проєктів на JavaScript npm встановлює той самий бінарник.

`setup` додає сервер MCP до кожного агента, якого знаходить, і встановлює навичку робочого процесу туди, звідки агент читає навички. Що саме він змінює, див. у [Налаштування агента](/docs/introduction/agents).

## Попросіть агента

- *"Перепиши цей CLI на Rust за допомогою rust-anything, від початку до кінця, і доведи, що він поводиться так само."*
- *"Цей пошук здається повільним. Профілюй його через rust-anything і перенеси гарячий цикл у Rust."*
- *"Сплануй міграцію `src/parser/` на Rust з rust-anything; портуй перший модуль і доведи, що він правильний."*
- *"Прожени бенчмарк порту Rust у `rust/text-rs` проти оригіналу і скажи, чи варто його випускати."*

## Або пройдіть кроки самі

Кроки на `fuzzyScore` з x18n: `profile` знаходить гарячий цикл, `bridge --batch` генерує крейт, `gate` проходить, а бенчмарк порівнює результат із TypeScript.

```sh
rust-anything profile . -- node bench.mjs              # що гаряче і хто це викликає
rust-anything bridge . src/fuzzy.ts --batch fuzzyScore:text
# напишіть src/port.rs (або доручіть агенту), потім:
rust-anything record rust/fuzzy-rs && rust-anything build rust/fuzzy-rs
rust-anything diff rust/fuzzy-rs                       # кожен записаний випадок має збігатися
rust-anything bench rust/fuzzy-rs                      # швидше? скаже вердикт
rust-anything gate rust/fuzzy-rs                       # готово означає, що це проходить
```

Кожен крок пояснено в розділі [Цикл](/docs/concepts/the-loop).

::: tip Коли чогось бракує
Якщо крок падає через те, що середовища виконання, налаштування агента чи сервера MCP немає або вони застарілі, запустіть [`rust-anything doctor`](/docs/introduction/doctor).
:::
