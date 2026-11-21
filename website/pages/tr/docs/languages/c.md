---
title: C
description: Bir C dosyasını, orijinal adlara sahip extern "C" fonksiyonlar ve bir header arkasında Rust'a port edin.
---

# C

| | |
| --- | --- |
| Birim | bir `.c` dosyası |
| Köprü | orijinal adlarla `extern "C"` fonksiyonlar ve bir header |
| Kaydeden ve yeniden oynatan | paylaşımlı kütüphane olarak derlenmiş orijinal, ctypes üzerinden çağrılır, vaka başına bir fork |
| Gerekenler | bir C derleyicisi ve Python 3.9+ (ctypes) |
| Durum | Bir cephe arkasında glibc üzerinde doğrulandı: tanımsız davranışlı bir vaka çıkarıldıktan sonra 1,859/1,859, gate geçiyor |

C batch sınıfı almaz.

## Çökmeler ve tanımsız davranış

Bir C fonksiyonunun sözleşmesi dışındaki girdiler (`isalpha(INT_MAX)`) segfault'a yol açabilir. C sürücüsü her vakayı fork edilmiş bir alt süreçte çalıştırır ve `crash: SIGSEGV` kaydeder; C'nin davranışı tanımsız olduğundan `diff` orada portun her davranışını kabul eder. Çökmeyen tanımsız davranışın (`ispunct(1000)` glibc'nin tablosunun ötesini okur ve 1 döndürür) henüz yerleşik bir işareti yoktur: böyle bir vaka `cases.jsonl`'den elle çıkarılır.

## Port etmeli misiniz?

Çoğu zaman hayır ve `analyze` nerede olduğunu söyler. Donanım yazmaçlarına dokunan, derleyicinin tip boyutlarına veya bellek düzenine dayanan ya da satır içi assembly kullanan (`volatile`, bitfield'lar, packed struct'lar, `__asm__`, adrese dönüştürülen tam sayılar) C kodu "C'de tut" olarak işaretlenir: sizin makinenizdeki bir kayıt hedef hakkında hiçbir şey kanıtlamaz ve kararlı sürücü ya da firmware kodu yeniden yazımdan pek kazanç sağlamaz. İyi taşınan, onu çevreleyen taşınabilir mantıktır (ayrıştırma, protokoller, veri işleme).

## Sınırlar

- **Buffer geçiren API'ler.** C köprüsü yalnızca skaler değerler ve `const char *` taşır. `char *out, size_t *outlen` ya da bir durum struct'ı alan fonksiyonlar gerekçesiyle birlikte C'de kalır.
- **Makrolar.** Makrolarla tanımlanan fonksiyonlar ayrıştırıcının hata bildirmesine yol açar ve plan bu birimleri kısmi olarak işaretler.

## Hız

Sınır geçişi yoktur: Rust kodu doğrudan C koduyla karşılaştırılır. glibc cephesinde `bench` genel olarak 0.87x ölçtü: ctype 1.1-1.4x daha hızlı, glibc'nin ince ayarlı `strtod`, `strspn`, `strcmp` fonksiyonları 0.5-0.7x.

Ayrıntılar: [Altı dil](/docs/real-world/six-languages).
