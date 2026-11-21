---
title: Əhatə
description: Qeydə alınmış halların orijinalın nə qədərini işlətdiyi, TypeScript/JavaScript üçün record və gate tərəfindən bildirilir.
---

# Əhatə

`diff`-dən keçmək portun hər qeydə alınmış hala uyğun gəldiyi deməkdir. Əhatə (coverage) bu halların orijinalın nə qədərini işlətdiyini deyir ki, qeydin nəyi əhatə etmədiyini biləsiniz.

TypeScript/JavaScript üçün `record` V8-in coverage məlumatından halların işlətdiyi orijinal sətirlərini ölçür, `gate` isə bunu keçən, məlumat xarakterli yoxlama kimi çap edir: çatılan sətirlərin payı və ən çox sətri buraxılmış fayllar. Digər dillər bunu hələ ölçmür.

Fuse.js-də hallar vahidin import etdiyi sətirlərin 81%-ni işlətdi ([vəziyyət](/docs/project/status)).

## Onu artırmaq

Halların heç vaxt çatmadığı sətirlər heç kimin yoxlamadığı davranışdır. Onlara bunlarla çatın:

- `record --from-tests -- <test command>`, orijinalın öz test dəstinin etdiyi hər çağırışı qeydə almaq üçün;
- `record --inputs`, yaradılmış girişlərin buraxdığı yollardan keçən real girişlərlə (strukturlaşdırılmış arqumentlər, domen string-ləri).

Bax [Qeyd](/docs/concepts/record) və [Nəyi tuta bilmir](/docs/concepts/limits).
