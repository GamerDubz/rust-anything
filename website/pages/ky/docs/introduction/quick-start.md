---
title: Тез баштоо
description: rust-anything'ти орнотуп, коддоо агентиңиз менен каттаңыз жана биринчи бирдикте циклди иштетиңиз.
---

# Тез баштоо

## Орнотууну агентиңизге тапшырыңыз

Муну Claude Code, Codex, Cursor же Gemini CLI ичине чаптаңыз:

```text
Install rust-anything: run `cargo install rust-anything`, then `rust-anything setup`.
Tell me when to restart you.
```

## Же өзүңүз орнотуңуз

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

Rust toolchain азырынча жокпу? macOS, Linux жана Windows үчүн даяр бинардык файлдар ар бир [GitHub release](https://github.com/erkamyaman/rust-anything/releases) барагына тиркелген, ал эми JavaScript долбоорлору үчүн npm ошол эле бинардык файлды орнотот.

`setup` тапкан ар бир агентке MCP серверди кошот жана workflow skill'ин агент skill'дерди окуган жерге орнотот. Ал эмнени өзгөртөрүн [Агентиңизди жөндөө](/docs/introduction/agents) барагынан караңыз.

## Агентиңизден сураңыз

- *"Бул CLI'ды rust-anything менен башынан аягына чейин Rust тилинде кайра жаз жана анын так ошондой иштээрин далилде."*
- *"Бул издөө жай иштеп жаткандай. Аны rust-anything менен профилде жана hot loop'ту Rust'ка көчүр."*
- *"rust-anything менен `src/parser/` папкасын Rust'ка көчүрүү планын түз; биринчи бирдикти порттоп, далилде."*
- *"`rust/text-rs` ичиндеги Rust портун түп нуска менен бенчмарк аркылуу салыштыр да, аны чыгаруу керекпи, айт."*

## Же кадамдарды өзүңүз аткарыңыз

x18n'дин `fuzzyScore` функциясындагы кадамдар: `profile` hot loop'ту табат, `bridge --batch` crate'ти генерациялайт, `gate` өтөт, ал эми бенчмарк аны TypeScript менен салыштырат.

```sh
rust-anything profile . -- node bench.mjs              # what is hot, and who calls it
rust-anything bridge . src/fuzzy.ts --batch fuzzyScore:text
# write src/port.rs (or let your agent), then:
rust-anything record rust/fuzzy-rs && rust-anything build rust/fuzzy-rs
rust-anything diff rust/fuzzy-rs                       # every recorded case must match
rust-anything bench rust/fuzzy-rs                      # faster? the verdict says
rust-anything gate rust/fuzzy-rs                       # done means this passes
```

Ар бир кадам [Цикл](/docs/concepts/the-loop) барагында түшүндүрүлөт.

::: tip Бир нерсе жетишпесе
Runtime, агенттин жөндөөлөрү же MCP сервер жок же эскирип калгандыктан кайсы бир кадам ишке ашпай калса, [`rust-anything doctor`](/docs/introduction/doctor) буйругун иштетиңиз.
:::
