---
title: Python
description: Portez un package ou un module Python en Rust via PyO3, avec des exceptions typées et l'API d'origine conservée.
---

# Python

| | |
| --- | --- |
| Unité | un package ou un module |
| Bridge | PyO3 (abi3), conversion directe, exceptions typées |
| Enregistré et rejoué par | Python, qui importe l'original |
| Prérequis | Python 3.9+ |
| État | Vérifié sur `colorsys.py` de CPython 3.13 : 2,400/2,400, le gate passe |

Les types viennent des annotations de type. Les paramètres non typés utilisés comme des nombres (`r - g`, `max(r, g, b)`, `x < 1`) sont déduits comme des nombres. `record --from-tests -- pytest` enregistre chaque appel que fait la propre suite de tests de l'original (Testé).

## Ce qu'un portage doit respecter

- Les appelants Python passent `1` aussi souvent que `1.0`, et les entiers sont transmis tels quels. L'enregistrement passe les nombres entiers sous forme d'entiers dans un cas sur quatre ; un portage typé `f64` a montré 134 écarts une fois les entiers enregistrés. Utilisez `crate::pynum::Num` pour un entier-ou-flottant.
- `max(nan, 1, 2)` vaut `nan` : la première valeur gagne sauf si une suivante est strictement plus grande.
- `-0.0 % 1.0` vaut `0.0`.
- Les erreurs renvoyées sous la forme `Err("TypeName: message")` deviennent cette exception.

Le code déjà compilé par numba, Cython ou JAX s'exécute en code machine : `profile` et `analyze` le signalent, car le porter apporte peu de vitesse.

## Vitesse

L'appel vers Rust coûte environ 100-300 ns et le code Rust est bien plus rapide que l'interpréteur, donc même les petites fonctions y gagnent. Sur `colorsys`, `bench` a mesuré le portage **1.35x plus rapide** que CPython par appel (1.5-1.9x sur la plupart des appels). En lot, `slugify` sur 20,000 chaînes est passé de 98 ms à **17x plus rapide** sur 4 cœurs.

Détails : [Six langages](/docs/real-world/six-languages).
