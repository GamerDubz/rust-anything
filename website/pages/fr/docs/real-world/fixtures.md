---
title: Fixtures et exécutions statiques
description: Des fixtures écrites pour mettre l'outil à l'épreuve, et des bibliothèques externes analysées et passées par bridge mais non exécutées.
---

# Fixtures et exécutions statiques

## Fixtures écrites pour mettre l'outil à l'épreuve

| Fixture | Ce qu'elle teste | Résultat |
| --- | --- | --- |
| `tests/fixtures/async` | fonctions async sur les deux bridges | 900/900, les deux gates passent |
| `tests/fixtures/classes` | classes : état, erreurs de constructeur, ordre de `Map`, `split('')` sur des emoji | 600/600 scénarios, les deux gates passent |
| `tests/fixtures/aliases` | `paths` de tsconfig avec `extends`, commentaires, virgules finales | analyze et record les suivent |
| `tests/fixtures/monorepo` | un package qui importe un voisin sans sortie de build | record le résout vers la source |

Trouvé dans l'outil, et corrigé : napi transformait `None` en `null` (JS donne `undefined`) ; des scénarios
trop courts et trop aléatoires pour attraper un bug lié à l'état (désormais jusqu'à 12 appels, en réutilisant des chaînes précédentes) ;
du code généré `let out = ()` et des closures appelées immédiatement que clippy rejette.
## Bibliothèques externes (statique uniquement)

`unjs/scule`, `unjs/ufo` et `unjs/pathe` ont été clonées, analysées et passées par bridge. Exécuter leur
code (`record` exécute l'original) a été refusé par la politique de sécurité de la session pour le code
téléchargé depuis Internet, donc ces exécutions s'arrêtent avant `record`.

| Bibliothèque | analyze | bridge |
| --- | --- | --- |
| scule (conversion de casse) | 2 unités, prêtes | les 11 fonctions passent par bridge après la correction ci-dessous |
| ufo (utilitaires d'URL) | 7 unités, prêtes ; `punycode.ts` classé premier | `toASCII` passé par bridge (JS non typé : passe en JSON) |
| pathe (utilitaires de chemins) | 5 unités ; `_glob.ts` à surveiller (regex dynamique) | 13 fonctions passées par bridge ; les exports typés `typeof path.join` passent en JSON |

Trouvé dans l'outil, et corrigé : les génériques contraints (`camelCase<T extends string | readonly
string[]>`) étaient traités comme « n'importe quelle valeur, fonctions comprises », ce qui gardait 10 des 11
fonctions de scule en TS. Les paramètres de type avec des contraintes de données sont désormais remplacés par leur contrainte.

Un portage de scule a été écrit (`demo` non inclus : il n'a jamais été enregistré face à l'original).
