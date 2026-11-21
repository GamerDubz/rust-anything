---
title: Быстрый старт
description: Установите rust-anything, зарегистрируйте его в своём агенте разработки и пройдите цикл на первом модуле.
---

# Быстрый старт

## Пусть агент установит его сам

Вставьте это в Claude Code, Codex, Cursor или Gemini CLI:

```text
Install rust-anything: run `cargo install rust-anything`, then `rust-anything setup`.
Tell me when to restart you.
```

## Или установите сами

::: tabs
== cargo
```sh
cargo install rust-anything   # из crates.io
rust-anything setup           # регистрирует его в Claude Code, Codex, Cursor и Gemini CLI
```
== npm
```sh
npm install -g rust-anything
rust-anything setup
```
:::

Ещё нет тулчейна Rust? Готовые бинарники для macOS, Linux и Windows прикреплены к каждому [релизу на GitHub](https://github.com/erkamyaman/rust-anything/releases), а для JavaScript-проектов npm устанавливает тот же бинарник.

`setup` добавляет MCP-сервер в каждый найденный агент и устанавливает навык рабочего процесса туда, откуда агент читает навыки. Что именно он меняет, описано в разделе [Настройка агента](/docs/introduction/agents).

## Попросите агента

- *«Перепиши этот CLI на Rust с помощью rust-anything от начала до конца и докажи, что он ведёт себя так же.»*
- *«Этот поиск ощущается медленным. Профилируй его через rust-anything и перенеси горячий цикл в Rust.»*
- *«Спланируй миграцию `src/parser/` на Rust с rust-anything; портируй первый модуль и докажи, что он работает.»*
- *«Сравни производительность Rust-порта в `rust/text-rs` с оригиналом и скажи, стоит ли его выкатывать.»*

## Или выполните шаги сами

Шаги на `fuzzyScore` из x18n: `profile` находит горячий цикл, `bridge --batch` генерирует крейт, `gate` проходит, а бенчмарк сравнивает результат с TypeScript.

```sh
rust-anything profile . -- node bench.mjs              # что тормозит и кто это вызывает
rust-anything bridge . src/fuzzy.ts --batch fuzzyScore:text
# напишите src/port.rs (или поручите агенту), затем:
rust-anything record rust/fuzzy-rs && rust-anything build rust/fuzzy-rs
rust-anything diff rust/fuzzy-rs                       # каждый записанный кейс должен совпасть
rust-anything bench rust/fuzzy-rs                      # стало быстрее? вердикт покажет
rust-anything gate rust/fuzzy-rs                       # готово, когда эта проверка пройдена
```

Каждый шаг объясняется в разделе [Цикл работы](/docs/concepts/the-loop).

::: tip Если чего-то не хватает
Если шаг падает из-за того, что среда выполнения, настройка агента или MCP-сервер отсутствуют или устарели, запустите [`rust-anything doctor`](/docs/introduction/doctor).
:::
