---
title: "Neyi yakalayamaz"
description: Geçmek, Rust'ın kaydedilen her vakayla eşleştiği anlamına gelir; fazlası değil. Sınırların nerede olduğu.
---

# Neyi yakalayamaz

Geçmek, Rust'ın kaydedilen her vakayla eşleştiği anlamına gelir; fazlası değil. Yeniden yazımları
vuran şeyler genellikle kaydın dışında yaşar, bu yüzden sınırların nerede olduğunu bilin:

- **Kimsenin kaydetmediği girdiler.** Üretilen vakalar, tuzaklar, orijinalin test takımı
  (`record --from-tests`) ve sizin `--inputs` girdileriniz tavandır. Gerçek girdiler ekleyin
  (production örnekleri, hata raporları); prod'u bozan kullanıcı girdisi nadiren bir üretecin aklına gelir.
- **Değişmiş bir orijinal.** `record`, birimin dosyalarının bir parmak izini kaydeder
  (`recorded-from.json`); orijinal daha sonra değişirse, orijinalin eskiden yaptığına karşı geçmek
  yerine, siz yeniden kaydedene kadar `diff` uyarır ve `gate` başarısız olur.
- **Regex'ler.** `regex` crate'inde lookaround ya da geri başvuru yoktur ve derlenen bir desen bile
  ASCII olmayan metinde `\w`, `\b`, `\d` ve büyük/küçük harf duyarsız eşleşmeyi JS, Python veya
  Java'dan farklı ele alabilir. `fancy-regex`'e geçmek ya da deseni yeniden yazmak kaydedilen her
  vakayı geçip yine de Türkçedeki noktasız `ı` veya bir zero-width joiner üzerinde farklı davranabilir. `record`,
  regex kullanan bir dosyadaki her fonksiyona regex tuzakları ekler (bunlar, Kelvin işareti, uzun s,
  Arap-Hint rakamları, satır ayırıcıları, son sigma), ama gerçek desenlerinizi gerçek metne karşı da fuzz edin.
- **Çalıştırmalar arasında değişenler.** `record` orijinali iki kez çalıştırır ve farklı olanları
  ayıklar: değişen değerler (zamanlar, id'ler) joker olur; başka bir sırayla gelen aynı satırlar
  (hash map'ler, eşzamanlılık) herhangi bir sırada karşılaştırılır, yani bir port yine de tam olarak
  o satırları üretmelidir; farklı sayıda satır `...` olur ve her şeyle eşleşir. `record` her türü
  listeler: her birine bakın, çünkü hash sırası veya eşzamanlılık farkı tam olarak bir portta
  gerçekten değişebilecek şeydir.
- **Float'lar.** Sayıdan metne biçimlendirme diller arasında farklıdır (`1e21`, `-0`, basamak
  sayıları). Tuzaklar bu değerleri içerir ve tam olarak eşleşmeleri gerekir; `--float-tolerance`
  yalnızca yuvarlamayı affeder, biçimlendirmeyi asla.
- **Çıktıda olmayan her şey.** Zamanlama, bellek, yük altında eşzamanlılık ve stdout, stderr, çıkış
  kodları, yazılan dosyalar ve HTTP yanıtları dışındaki yan etkiler (ağ çağrıları, veritabanları,
  sinyaller) karşılaştırılmaz.
- **Diğer platformlar.** Bir kayıt, davranışı onu çalıştıran makinede kanıtlar. Sonuçları tip
  boyutlarına, endianness'a veya derleyiciye bağlı olan C kodu hedefte farklı davranabilir; `analyze`
  bu nedenle donanıma dönük C kodunu C'de tutar.
