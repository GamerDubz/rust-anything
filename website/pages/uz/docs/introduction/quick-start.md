---
title: Tezkor boshlash
description: rust-anything'ni o'rnating, uni kodlash agentingizda ro'yxatdan o'tkazing va siklni birinchi birlikda ishga tushiring.
---

# Tezkor boshlash

## O'rnatishni agentingizga topshiring

Buni Claude Code, Codex, Cursor yoki Gemini CLI'ga joylashtiring:

```text
Install rust-anything: run `cargo install rust-anything`, then `rust-anything setup`.
Tell me when to restart you.
```

## Yoki o'zingiz o'rnating

::: tabs
== cargo
```sh
cargo install rust-anything   # crates.io'dan
rust-anything setup           # uni Claude Code, Codex, Cursor va Gemini CLI'da ro'yxatdan o'tkazadi
```
== npm
```sh
npm install -g rust-anything
rust-anything setup
```
:::

Hali Rust toolchain'ingiz yo'qmi? macOS, Linux va Windows uchun tayyor binary fayllar har bir [GitHub release](https://github.com/erkamyaman/rust-anything/releases)'ga biriktirilgan, JavaScript loyihalari uchun esa npm xuddi shu binary'ni o'rnatadi.

`setup` topgan har bir agentiga MCP serverni qo'shadi va workflow skill'ini agent skill'larni o'qiydigan joyga o'rnatadi. U nimalarni o'zgartirishini [Agentingizni sozlash](/docs/introduction/agents) sahifasidan ko'ring.

## Agentingizdan so'rang

- *"Bu CLI'ni rust-anything bilan boshidan oxirigacha Rust'da qayta yoz va u xuddi shunday ishlashini isbotla."*
- *"Bu qidiruv sekin tuyulyapti. rust-anything bilan profilini ol va issiq siklni Rust'ga ko'chir."*
- *"`src/parser/` ni rust-anything bilan Rust'ga ko'chirishni rejalashtir; birinchi birlikni port qil va isbotla."*
- *"`rust/text-rs` dagi Rust portini asl nusxaga qarshi benchmark qil va uni chiqarish kerakmi, ayt."*

## Yoki qadamlarni o'zingiz bajaring

x18n'ning `fuzzyScore` funksiyasidagi qadamlar: `profile` issiq siklni topadi, `bridge --batch` crate'ni generatsiya qiladi, `gate` o'tadi va benchmark uni TypeScript bilan solishtiradi.

```sh
rust-anything profile . -- node bench.mjs              # nima issiq va uni kim chaqiradi
rust-anything bridge . src/fuzzy.ts --batch fuzzyScore:text
# src/port.rs ni yozing (yoki agentingizga yozdiring), so'ng:
rust-anything record rust/fuzzy-rs && rust-anything build rust/fuzzy-rs
rust-anything diff rust/fuzzy-rs                       # har bir yozib olingan holat mos kelishi kerak
rust-anything bench rust/fuzzy-rs                      # tezroqmi? hukm aytadi
rust-anything gate rust/fuzzy-rs                       # tayyor degani, bu o'tadi degani
```

Har bir qadam [Sikl](/docs/concepts/the-loop) sahifasida tushuntirilgan.

::: tip Biror narsa yetishmasa
Runtime, agent sozlamalari yoki MCP server yo'qligi yoki eskirganligi sababli biror qadam muvaffaqiyatsiz bo'lsa, [`rust-anything doctor`](/docs/introduction/doctor) ni ishga tushiring.
:::
