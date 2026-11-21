---
title: Kapsam
description: Kaydedilen vakaların orijinalin ne kadarını çalıştırdığı; TypeScript/JavaScript için record ve gate tarafından raporlanır.
---

# Kapsam

`diff`'i geçmek, portun kaydedilen her vakayla eşleştiği anlamına gelir. Kapsam, bu vakaların orijinalin ne kadarını çalıştırdığını söyler; böylece kaydın neyi kapsamadığını bilirsiniz.

TypeScript/JavaScript için `record`, vakaların çalıştırdığı orijinal satırları V8'in kapsam verisinden ölçer ve `gate` bunu geçen, bilgi amaçlı bir kontrol olarak yazdırır: ulaşılan satırların oranı ve en çok satırı kaçırılan dosyalar. Diğer diller bunu henüz ölçmez.

Fuse.js'te vakalar, birimin import ettiği satırların %81'ini çalıştırdı ([durum](/docs/project/status)).

## Kapsamı artırmak

Vakaların hiç ulaşmadığı satırlar, kimsenin kontrol etmediği davranışlardır. Onlara şunlarla ulaşın:

- orijinalin kendi test takımının yaptığı her çağrıyı kaydetmek için `record --from-tests -- <test command>`;
- üretilen girdilerin kaçırdığı yollardan geçen gerçek girdilerle `record --inputs` (yapılandırılmış argümanlar, alana özgü string'ler).

Bkz. [Record](/docs/concepts/record) ve [Neyi yakalayamaz](/docs/concepts/limits).
