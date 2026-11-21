---
title: Hızlı başlangıç
description: rust-anything'i kurun, kodlama ajanınıza kaydedin ve döngüyü ilk birim üzerinde çalıştırın.
---

# Hızlı başlangıç

## Kurulumu ajanınıza bırakın

Bunu Claude Code, Codex, Cursor veya Gemini CLI'a yapıştırın:

```text
Install rust-anything: run `cargo install rust-anything`, then `rust-anything setup`.
Tell me when to restart you.
```

## Ya da kendiniz kurun

::: tabs
== cargo
```sh
cargo install rust-anything   # crates.io'dan
rust-anything setup           # Claude Code, Codex, Cursor ve Gemini CLI'a kaydeder
```
== npm
```sh
npm install -g rust-anything
rust-anything setup
```
:::

Henüz Rust toolchain'iniz yok mu? macOS, Linux ve Windows için hazır derlenmiş binary'ler her [GitHub release](https://github.com/erkamyaman/rust-anything/releases)'e eklenmiştir; JavaScript projeleri için npm aynı binary'yi kurar.

`setup`, bulduğu her ajana MCP sunucusunu ekler ve iş akışı skill'ini ajanın skill'leri okuduğu yere kurar. Neleri değiştirdiği için bkz. [Ajanınızı kurun](/docs/introduction/agents).

## Ajanınıza sorun

- *"Bu CLI'ı rust-anything ile baştan sona Rust'ta yeniden yaz ve aynı davrandığını kanıtla."*
- *"Bu arama yavaş geliyor. rust-anything ile profilini çıkar ve sıcak döngüyü Rust'a taşı."*
- *"`src/parser/`'ın rust-anything ile Rust'a geçişini planla; ilk birimi port et ve kanıtla."*
- *"`rust/text-rs` içindeki Rust portunu orijinaline karşı benchmark'la ve yayınlamaya değer mi söyle."*

## Ya da adımları kendiniz çalıştırın

x18n'in `fuzzyScore` fonksiyonu üzerinde adımlar: `profile` sıcak döngüyü bulur, `bridge --batch` crate'i üretir, `gate` geçer ve benchmark onu TypeScript ile karşılaştırır.

```sh
rust-anything profile . -- node bench.mjs              # sıcak olan ne, onu kim çağırıyor
rust-anything bridge . src/fuzzy.ts --batch fuzzyScore:text
# src/port.rs'i yazın (ya da ajanınıza yazdırın), ardından:
rust-anything record rust/fuzzy-rs && rust-anything build rust/fuzzy-rs
rust-anything diff rust/fuzzy-rs                       # kaydedilen her vaka eşleşmeli
rust-anything bench rust/fuzzy-rs                      # daha mı hızlı? karar söyler
rust-anything gate rust/fuzzy-rs                       # bitti demek, bunun geçmesi demek
```

Her adım [Döngü](/docs/concepts/the-loop) sayfasında açıklanır.

::: tip Bir şey eksik olduğunda
Bir runtime, ajan kurulumu ya da MCP sunucusu eksik veya güncel olmadığı için bir adım başarısız olursa [`rust-anything doctor`](/docs/introduction/doctor) çalıştırın.
:::
