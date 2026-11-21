---
title: Örtük
description: Ýazga alnan ýagdaýlaryň asyl nusganyň näçesini işledendigi, TypeScript/JavaScript üçin record we gate tarapyndan habar berilýär.
---

# Örtük

`diff`-den geçmek portuň ýazga alnan her ýagdaýa gabat gelýändigini aňladýar. Örtük şol ýagdaýlaryň asyl nusganyň näçesini işledendigini aýdýar, şonuň üçin siz ýazgynyň nämäni öz içine almaýandygyny bilýärsiňiz.

TypeScript/JavaScript üçin `record` V8-iň coverage maglumatlaryndan ýagdaýlaryň asyl nusganyň haýsy setirlerini işledendigini ölçeýär, `gate` bolsa ony geçýän, maglumat beriji barlag hökmünde çap edýär: ýetilen setirleriň paýy we iň köp setiri sypdyrylan faýllar. Beýleki diller entek muny ölçemeýär.

Fuse.js-de ýagdaýlar birligiň import edýän setirleriniň 81%-ini işletdi ([ýagdaý](/docs/project/status)).

## Ony ýokarlandyrmak

Ýagdaýlaryň hiç haçan ýetmeýän setirleri hiç kimiň barlamadyk özüni alyp barşydyr. Olara şular bilen ýetiň:

- `record --from-tests -- <test command>`, asyl nusganyň öz test toplumynyň edýän her çagyryşyny ýazga almak üçin;
- `record --inputs`, döredilen girişleriň sypdyrýan ýollaryndan geçýän hakyky girişler bilen (gurluşly argumentler, domen setirleri).

[Ýazga almak](/docs/concepts/record) we [Onuň tutup bilmeýän zatlary](/docs/concepts/limits) sahypalaryna serediň.
