---
title: "Ce qu'il ne détecte pas"
description: Passer signifie que le Rust correspond à chaque cas enregistré, rien de plus. Où se trouvent les limites.
---

# Ce qu'il ne détecte pas

Passer signifie que le Rust correspond à chaque cas enregistré, rien de plus. Ce qui fait échouer les réécritures
se trouve en général hors de l'enregistrement, alors sachez où sont les limites :

- **Les entrées que personne n'a enregistrées.** Les cas générés, les pièges, la suite de tests de l'original
  (`record --from-tests`) et vos propres `--inputs` sont le plafond. Ajoutez de vraies entrées (échantillons
  de production, rapports de bugs) ; l'entrée utilisateur qui casse la prod est rarement celle à laquelle un générateur pense.
- **Un original qui a évolué.** `record` sauvegarde une empreinte des fichiers de l'unité
  (`recorded-from.json`) ; quand l'original change par la suite, `diff` avertit et `gate` échoue tant que vous
  n'avez pas réenregistré, au lieu de passer face à ce que faisait l'original auparavant.
- **Les regex.** La crate `regex` n'a ni lookaround ni références arrière, et même un motif qui
  compile peut traiter `\w`, `\b`, `\d` et la correspondance insensible à la casse sur du texte non ASCII autrement
  que JS, Python ou Java. Passer à `fancy-regex` ou réécrire le motif peut passer chaque
  cas enregistré et pourtant différer sur un `ı` turc sans point ou un zero-width joiner. `record` ajoute
  des pièges regex (ceux-là, le signe Kelvin, le s long, les chiffres arabes-indiens, les séparateurs de ligne, le sigma final)
  à chaque fonction d'un fichier qui utilise des regex, mais testez aussi vos vrais motifs par fuzzing sur du texte réel.
- **Ce qui change d'une exécution à l'autre.** `record` exécute l'original deux fois et trie ce qui a différé :
  les valeurs changeantes (heures, identifiants) deviennent des jokers ; les mêmes lignes dans un autre ordre (tables de hachage,
  concurrence) sont comparées dans n'importe quel ordre, donc un portage doit quand même produire exactement ces lignes ; un
  nombre de lignes différent devient `...`, qui correspond à tout. `record` liste chaque type :
  examinez-les tous, car une différence d'ordre de hachage ou de concurrence est justement ce qui peut changer
  pour de vrai dans un portage.
- **Les flottants.** La conversion de nombre en texte diffère selon les langages (`1e21`, `-0`, nombre de chiffres).
  Les pièges incluent ces valeurs, et elles doivent correspondre exactement ; `--float-tolerance` ne pardonne
  que l'arrondi, jamais le formatage.
- **Tout ce qui n'est pas dans la sortie.** Le temps d'exécution, la mémoire, la concurrence sous charge, et les effets de bord autres
  que stdout, stderr, les codes de sortie, les fichiers écrits et les réponses HTTP (appels réseau, bases de données,
  signaux) ne sont pas comparés.
- **Les autres plateformes.** Un enregistrement prouve le comportement sur la machine qui l'a exécuté. Du C dont les résultats
  dépendent de la taille des types, de l'endianness ou du compilateur peut se comporter autrement sur la cible ; `analyze`
  garde en C le code C proche du matériel pour cette raison.
