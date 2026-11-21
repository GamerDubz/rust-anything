---
title: Couverture
description: La part de l'original exécutée par les cas enregistrés, rapportée par record et gate pour TypeScript/JavaScript.
---

# Couverture

Passer `diff` signifie que le portage correspond à chaque cas enregistré. La couverture vous dit quelle part de l'original ces cas ont exécutée, pour savoir ce que l'enregistrement ne couvre pas.

Pour TypeScript/JavaScript, `record` mesure les lignes de l'original exécutées par les cas, à partir de la couverture de V8, et `gate` l'affiche comme une vérification informative qui passe toujours : la part de lignes atteintes, et les fichiers avec le plus de lignes manquées. Les autres langages ne la mesurent pas encore.

Sur Fuse.js, les cas ont exécuté 81% des lignes que l'unité importe ([état](/docs/project/status)).

## L'augmenter

Les lignes qu'aucun cas n'atteint sont du comportement que personne n'a vérifié. Atteignez-les avec :

- `record --from-tests -- <test command>`, pour enregistrer chaque appel que fait la propre suite de tests de l'original ;
- `record --inputs`, avec de vraies entrées qui empruntent les chemins que les entrées générées manquent (arguments structurés, chaînes métier).

Voir [Record](/docs/concepts/record) et [Ce qu'il ne détecte pas](/docs/concepts/limits).
