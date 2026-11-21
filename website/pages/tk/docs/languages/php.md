---
title: PHP (preview)
description: PHP preview ýagdaýynda. analyze PHP programmasyny meýilleşdirýär, PHP CLI-ni ýa-da serwerini bolsa ýazga alyp, gaýtadan işledip we Rust front door-yň arkasyna goýup bolýar.
---

# PHP (preview)

| | |
| --- | --- |
| Birlik | funksiýalardan we `public static` usullaryndan ybarat bukja |
| Bridge | indiki nobatda: C ABI arkaly PHP FFI |
| Häzir | tutuş programmalar: `app record`, `app replay` we front door, CLI-ler we serwerler üçin (`php -S`) |
| Ýagdaý | Preview: diňe `analyze` we tutuş programmalar; birlikleri entek bridge edip bolmaýar |

`analyze` PHP programmasyny meýilleşdirýär: Composer paketleri we PSR-4 autoloading, loose comparison we integer-iň float-a doly geçmegi ýaly töwekgelçilikler, crate-lere laýyklaşdyrylan Composer paketleri. Tipler PHP tiplerinden we phpdoc-dan alynýar.

PHP CLI-ni ýa-da serwerini ýazga alyp, gaýtadan işledip we Rust front door-yň arkasyna goýup bolýar:

```sh
rust-anything app record . -- php cli.php
rust-anything app record . --http -- php -S 127.0.0.1:{port} router.php
rust-anything app replay .
rust-anything app front-door .
```

Onuň birliklerini PHP FFI arkaly Rust-a geçirmek indiki ädim ([issue #2](https://github.com/erkamyaman/rust-anything/issues/2)). Oňa çenli `bridge` PHP birliklerini düşnükli habar bilen ret edýär.

CI PHP gurnamaýar, şonuň üçin PHP testleri diňe ol gurnalan maşynda işleýär.
