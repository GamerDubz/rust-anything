---
title: Python
description: Migre um pacote ou módulo Python para Rust através de PyO3, com exceções tipadas e a API original mantida.
---

# Python

| | |
| --- | --- |
| Unidade | um pacote ou um módulo |
| Bridge | PyO3 (abi3), conversão direta, exceções tipadas |
| Registado e reproduzido por | Python, a importar o original |
| Requisitos | Python 3.9+ |
| Estado | Verificado em `colorsys.py` do CPython 3.13: 2,400/2,400, o gate passa |

Os tipos vêm das type hints. Parâmetros sem tipo utilizados como números (`r - g`, `max(r, g, b)`, `x < 1`) são inferidos como números. `record --from-tests -- pytest` regista todas as chamadas feitas pela própria suite de testes do original (Testado).

## O que uma migração tem de acertar

- Quem chama código Python passa `1` tantas vezes quanto `1.0`, e os ints passam tal como estão. O registo passa números inteiros como ints em cada quarto caso; uma migração tipada como `f64` mostrou 134 divergências assim que os ints foram registados. Utilize `crate::pynum::Num` para int-ou-float.
- `max(nan, 1, 2)` é `nan`: o primeiro valor ganha, a menos que um posterior seja maior na comparação.
- `-0.0 % 1.0` é `0.0`.
- Erros devolvidos como `Err("TypeName: message")` passam a ser essa exceção.

Código já compilado por numba, Cython ou JAX corre como código máquina: o `profile` e o `analyze` assinalam-no, já que migrá-lo traz pouco ganho de velocidade.

## Velocidade

A chamada para Rust custa cerca de 100-300 ns e o código Rust é muito mais rápido do que o interpretador, por isso até funções pequenas ganham. Em `colorsys`, o `bench` mediu a migração **1.35x mais rápida** do que o CPython por chamada (1.5-1.9x na maioria das chamadas). Em lote, `slugify` sobre 20,000 strings passou de 98 ms para **17x mais rápido** em 4 núcleos.

Detalhes: [Seis linguagens](/docs/real-world/six-languages).
