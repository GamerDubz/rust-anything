---
title: PHP (preview)
description: PHP preview күйінде. analyze PHP қолданбасын жоспарлайды, ал PHP CLI немесе серверін жазып алуға, қайта ойнатуға және Rust front door-ының артына қоюға болады.
---

# PHP (preview)

| | |
| --- | --- |
| Бірлік | функциялар мен `public static` әдістерінен тұратын бума |
| Bridge | келесі кезекте: C ABI арқылы PHP FFI |
| Бүгін | бүкіл қолданбалар: `app record`, `app replay` және front door, CLI-лар мен серверлер үшін (`php -S`) |
| Күйі | Preview: тек `analyze` және бүкіл қолданбалар; бірліктерге әлі bridge жасау мүмкін емес |

`analyze` PHP қолданбасын жоспарлайды: Composer пакеттері және PSR-4 autoloading, loose comparison және integer-дің float-қа толып кетуі сияқты тәуекелдер, crate-терге сәйкестендірілген Composer пакеттері. Типтер PHP типтері мен phpdoc-тан алынады.

PHP CLI немесе серверін жазып алуға, қайта ойнатуға және Rust front door-ының артына қоюға болады:

```sh
rust-anything app record . -- php cli.php
rust-anything app record . --http -- php -S 127.0.0.1:{port} router.php
rust-anything app replay .
rust-anything app front-door .
```

Оның бірліктерін PHP FFI арқылы Rust-қа порттау келесі қадам ([issue #2](https://github.com/erkamyaman/rust-anything/issues/2)). Оған дейін `bridge` PHP бірліктерін түсінікті хабармен қабылдамайды.

CI PHP орнатпайды, сондықтан PHP тесттері тек ол орнатылған машинада ғана іске қосылады.
