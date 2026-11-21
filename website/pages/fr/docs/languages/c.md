---
title: C
description: Portez un fichier C en Rust derrière des fonctions extern "C" portant les noms d'origine, avec un en-tête.
---

# C

| | |
| --- | --- |
| Unité | un fichier `.c` |
| Bridge | fonctions `extern "C"` avec les noms d'origine et un en-tête |
| Enregistré et rejoué par | l'original compilé en bibliothèque partagée, appelé via ctypes, un fork par cas |
| Prérequis | un compilateur C et Python 3.9+ (ctypes) |
| État | Vérifié sur la glibc derrière une façade : 1,859/1,859 après retrait d'un cas de comportement indéfini, le gate passe |

C n'a pas de classes de lot.

## Plantages et comportement indéfini

Des entrées hors du contrat d'une fonction C (`isalpha(INT_MAX)`) peuvent provoquer une segfault. Le pilote C exécute chaque cas dans un processus enfant forké et enregistre `crash: SIGSEGV` ; `diff` accepte alors n'importe quel comportement du portage, puisque celui du C est indéfini. Le comportement indéfini qui ne plante pas (`ispunct(1000)` lit au-delà de la table de la glibc et renvoie 1) n'a pas encore de marqueur intégré : un tel cas est retiré de `cases.jsonl` à la main.

## Faut-il le porter ?

Souvent non, et `analyze` vous dit où. Le C qui touche des registres matériels, dépend de la taille des types ou de la disposition mémoire de son compilateur, ou utilise de l'assembleur en ligne (`volatile`, champs de bits, structs packées, `__asm__`, entiers convertis en adresses) est marqué « garder en C » : un enregistrement sur votre machine ne prouve rien sur la cible, et du code de pilote ou de firmware stable gagne peu à une réécriture. C'est la logique portable qui l'entoure (analyse syntaxique, protocoles, traitement de données) qui se déplace bien.

## Limites

- **Les API qui passent des tampons.** Le bridge C ne transporte que des scalaires et des `const char *`. Les fonctions qui prennent `char *out, size_t *outlen` ou une struct d'état restent en C, avec la raison.
- **Les macros.** Les fonctions définies par des macros font remonter des erreurs à l'analyseur, et le plan marque ces unités comme partielles.

## Vitesse

Il n'y a pas de traversée : le code Rust est comparé directement au code C. Sur la façade glibc, `bench` a mesuré 0.87x au total : ctype 1.1-1.4x plus rapide, `strtod`, `strspn`, `strcmp` optimisés de la glibc 0.5-0.7x.

Détails : [Six langages](/docs/real-world/six-languages).
