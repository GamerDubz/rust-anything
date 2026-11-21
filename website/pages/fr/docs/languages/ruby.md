---
title: Ruby
description: Portez des fonctions de module Ruby en Rust via une extension magnus sous les modules d'origine.
---

# Ruby

| | |
| --- | --- |
| Unité | un fichier ou un dossier de fonctions de module |
| Bridge | une extension magnus sous les modules d'origine |
| Enregistré et rejoué par | un pilote Ruby généré |
| Prérequis | Ruby 3+ |
| État | Vérifié sur `shellwords.rb` de Ruby 3.3 : 1,617/1,617 (446 lèvent une exception), le gate passe |

Les types viennent des tags YARD ; les paramètres non typés utilisés comme des nombres sont déduits comme des nombres. Les lots s'écrivent `Mod::FnBatch.new(items)`, et les éléments d'un lot peuvent être n'importe quelle valeur.

## Ce qu'un portage doit respecter

- `downcase` passe chaque caractère en minuscule isolément, sans la règle du sigma final de Rust.
- `Array#sum` utilise la sommation de Kahan-Babuska et part de l'entier 0, donc `[-0.0].sum` vaut `0.0`.
- `Float#to_s` passe en notation exponentielle à partir de 1e15 (`1e15.to_s` donne `1.0e+15`, `1e14.to_s` donne `100000000000000.0`) ; `nil.inspect` à l'intérieur d'un tableau donne `nil`.
- Le typage dynamique coûte du code : le portage de `shellwords` réimplémente le `to_s` et le `inspect` de Ruby pour les nombres, nil, les tableaux et les hashes, car `shellescape` accepte n'importe quoi.

## Vitesse

L'interpréteur est assez lent pour que même les petites fonctions y gagnent. Sur `shellwords`, `bench` a mesuré le portage **4.4x plus rapide** que Ruby par appel (3.6-7x selon la fonction). En lot sur 4 cœurs : `Shellwords.shellescape` sur 50,000 valeurs mixtes (88 ms en Ruby) a tourné **11.8x plus vite**, et `slugify` sur 20,000 chaînes (110 ms) **12.7x**.

Détails : [Six langages](/docs/real-world/six-languages).
