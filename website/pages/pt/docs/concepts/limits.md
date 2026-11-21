---
title: "O que não consegue detetar"
description: Passar significa que o Rust corresponde a todos os casos registados, nada mais. Onde estão os limites.
---

# O que não consegue detetar

Passar significa que o Rust corresponde a todos os casos registados, nada mais. O que costuma
estragar as reescritas está normalmente fora do registo, por isso conheça os limites:

- **Entradas que ninguém registou.** Os casos gerados, as armadilhas, a suite de testes do original
  (`record --from-tests`) e os seus próprios `--inputs` são o limite. Adicione entradas reais (amostras
  de produção, relatórios de bugs); a entrada do utilizador que parte a produção raramente é uma em que
  um gerador pense.
- **Um original que evoluiu.** O `record` guarda uma impressão digital dos ficheiros da unidade
  (`recorded-from.json`); quando o original muda mais tarde, o `diff` avisa e o `gate` falha até
  registar de novo, em vez de passar contra o que o original costumava fazer.
- **Regexes.** A crate `regex` não tem lookaround nem backreferences, e mesmo um padrão que
  compila pode tratar `\w`, `\b`, `\d` e a correspondência sem distinção de maiúsculas em texto não ASCII
  de forma diferente do JS, Python ou Java. Trocar para `fancy-regex` ou reescrever o padrão pode passar
  todos os casos registados e ainda assim diferir num `ı` turco sem ponto ou num zero-width joiner. O
  `record` adiciona armadilhas de regex (essas, o sinal Kelvin, o s longo, os dígitos árabe-índicos, os
  separadores de linha, o sigma final) a todas as funções de um ficheiro que use regexes, mas faça também
  fuzzing dos seus padrões reais contra texto real.
- **O que muda entre execuções.** O `record` executa o original duas vezes e separa o que diferiu:
  valores alterados (horas, ids) passam a wildcards; as mesmas linhas noutra ordem (hash maps,
  concorrência) são comparadas em qualquer ordem, por isso uma migração continua a ter de produzir
  exatamente essas linhas; um número diferente de linhas passa a `...`, que corresponde a qualquer coisa.
  O `record` lista cada tipo: analise cada um, pois uma diferença de ordem de hash ou de concorrência é
  exatamente o que pode mudar a sério numa migração.
- **Floats.** A formatação de números para texto difere entre linguagens (`1e21`, `-0`, número de
  dígitos). As armadilhas incluem esses valores, e têm de corresponder exatamente; o `--float-tolerance`
  perdoa apenas o arredondamento, nunca a formatação.
- **Tudo o que não está no output.** Tempos, memória, concorrência sob carga e efeitos secundários
  além de stdout, stderr, códigos de saída, ficheiros escritos e respostas HTTP (chamadas de rede,
  bases de dados, sinais) não são comparados.
- **Outras plataformas.** Um registo prova o comportamento na máquina que o executou. Código C cujos
  resultados dependem do tamanho dos tipos, da endianness ou do compilador pode comportar-se de forma
  diferente no destino; o `analyze` mantém em C o código C ligado ao hardware por essa razão.
