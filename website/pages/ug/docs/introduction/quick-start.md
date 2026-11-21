---
title: تېز باشلاش
description: rust-anything نى ئورنىتىڭ، ئۇنى كود ۋاكالەتچىڭىزگە تىزىملىتىڭ، ھەمدە تۇنجى بىرلىكتە ئايلانمىنى ئىجرا قىلىڭ.
---

# تېز باشلاش

## ۋاكالەتچىڭىزگە ئورناتقۇزۇڭ

بۇنى Claude Code، Codex، Cursor ياكى Gemini CLI غا چاپلاڭ:

```text
Install rust-anything: run `cargo install rust-anything`, then `rust-anything setup`.
Tell me when to restart you.
```

## ياكى ئۆزىڭىز ئورنىتىڭ

::: tabs
== cargo
```sh
cargo install rust-anything   # crates.io دىن
rust-anything setup           # Claude Code، Codex، Cursor ۋە Gemini CLI غا تىزىملىتىدۇ
```
== npm
```sh
npm install -g rust-anything
rust-anything setup
```
:::

تېخى Rust قورال زەنجىرىڭىز يوقمۇ؟ macOS، Linux ۋە Windows ئۈچۈن ئالدىن تۈزۈلگەن ئىككىلىك ھۆججەتلەر ھەر بىر [GitHub release](https://github.com/erkamyaman/rust-anything/releases) غا قوشۇلغان، JavaScript تۈرلىرى ئۈچۈن بولسا npm ئوخشاش ئىككىلىك ھۆججەتنى ئورنىتىدۇ.

`setup` تاپقان ھەر بىر ۋاكالەتچىگە MCP مۇلازىمېتىرىنى قوشىدۇ ۋە خىزمەت ئېقىمى ماھارىتىنى ۋاكالەتچى ماھارەتلەرنى ئوقۇيدىغان جايغا ئورنىتىدۇ. ئۇنىڭ نېمىلەرنى ئۆزگەرتىدىغانلىقى ئۈچۈن [ۋاكالەتچىڭىزنى تەڭشەش](/docs/introduction/agents) نى كۆرۈڭ.

## ۋاكالەتچىڭىزدىن سوراڭ

- *"بۇ CLI نى rust-anything بىلەن باشتىن-ئاخىر Rust دا قايتا يېز، ھەمدە ئۇنىڭ ئوخشاش ئىشلەيدىغانلىقىنى ئىسپاتلا."*
- *"بۇ ئىزدەش ئاستا تۇيۇلىدۇ. ئۇنى rust-anything بىلەن ئانالىز قىلىپ، قىزىق ئايلانمىنى Rust قا يۆتكە."*
- *"`src/parser/` نى rust-anything بىلەن Rust قا يۆتكەشنى پىلانلا؛ تۇنجى بىرلىكنى كۆچۈرۈپ ئىسپاتلا."*
- *"`rust/text-rs` دىكى Rust كۆچۈرمىسىنى ئەسلى نۇسخىغا سېلىشتۇرۇپ سىنا، ئېلان قىلىش كېرەكمۇ يوق ماڭا ئېيت."*

## ياكى قەدەملەرنى ئۆزىڭىز ئىجرا قىلىڭ

x18n نىڭ `fuzzyScore` ىدىكى قەدەملەر: `profile` قىزىق ئايلانمىنى تاپىدۇ، `bridge --batch` crate نى ھاسىل قىلىدۇ، `gate` ئۆتىدۇ، سىناق ئۆلچىمى ئۇنى TypeScript بىلەن سېلىشتۇرىدۇ.

```sh
rust-anything profile . -- node bench.mjs              # نېمە قىزىق، ئۇنى كىم چاقىرىدۇ
rust-anything bridge . src/fuzzy.ts --batch fuzzyScore:text
# src/port.rs نى يېزىڭ (ياكى ۋاكالەتچىڭىزگە يازدۇرۇڭ)، ئاندىن:
rust-anything record rust/fuzzy-rs && rust-anything build rust/fuzzy-rs
rust-anything diff rust/fuzzy-rs                       # خاتىرىلەنگەن ھەر بىر ئەھۋال ماس كېلىشى كېرەك
rust-anything bench rust/fuzzy-rs                      # تېزرەكمۇ؟ ھۆكۈم ئېيتىدۇ
rust-anything gate rust/fuzzy-rs                       # تامام دېگەن بۇنىڭ ئۆتۈشى
```

ھەر بىر قەدەم [ئايلانما](/docs/concepts/the-loop) دا چۈشەندۈرۈلگەن.

::: tip بىر نەرسە كەم بولغاندا
ئەگەر بىر قەدەم ئىجرا مۇھىتى، ۋاكالەتچى تەڭشىكى ياكى MCP مۇلازىمېتىرى كەم ياكى كونىراپ كەتكەنلىكى سەۋەبىدىن مەغلۇپ بولسا، [`rust-anything doctor`](/docs/introduction/doctor) نى ئىجرا قىلىڭ.
:::
