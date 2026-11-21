---
title: C
description: Migre um ficheiro C para Rust por trás de funções extern "C" com os nomes originais e um header.
---

# C

| | |
| --- | --- |
| Unidade | um ficheiro `.c` |
| Bridge | funções `extern "C"` com os nomes originais e um header |
| Registado e reproduzido por | o original compilado como biblioteca partilhada, chamado através de ctypes, um fork por caso |
| Requisitos | um compilador de C e Python 3.9+ (ctypes) |
| Estado | Verificado na glibc por trás de uma fachada: 1,859/1,859 depois de retirar um caso com comportamento indefinido, o gate passa |

O C não tem classes de lote.

## Falhas e comportamento indefinido

Entradas fora do contrato de uma função C (`isalpha(INT_MAX)`) podem provocar um segfault. O driver de C executa cada caso num processo filho (fork) e regista `crash: SIGSEGV`; o `diff` aceita aí qualquer comportamento da migração, já que o do C é indefinido. O comportamento indefinido que não provoca falha (`ispunct(1000)` lê para lá da tabela da glibc e devolve 1) ainda não tem marcador próprio: esse caso é removido manualmente de `cases.jsonl`.

## Vale a pena migrar?

Muitas vezes não, e o `analyze` diz-lhe onde. Código C que acede a registos de hardware, depende dos tamanhos de tipos ou da disposição em memória do seu compilador, ou utiliza assembly inline (`volatile`, bitfields, structs compactadas, `__asm__`, inteiros convertidos em endereços) é marcado como "manter em C": um registo feito na sua máquina não prova nada sobre o alvo, e código estável de drivers ou firmware ganha pouco com uma reescrita. A lógica portável à volta (parsing, protocolos, tratamento de dados) é o que se migra bem.

## Limites

- **APIs que passam buffers.** A bridge de C só transporta escalares e `const char *`. Funções que recebem `char *out, size_t *outlen` ou uma struct de estado ficam em C, com o motivo.
- **Macros.** Funções definidas através de macros fazem o parser reportar erros, e o plano marca essas unidades como parciais.

## Velocidade

Não há travessia: o código Rust é comparado diretamente com o código C. Na fachada da glibc, o `bench` mediu 0.87x no total: ctype 1.1-1.4x mais rápido, as funções otimizadas da glibc `strtod`, `strspn`, `strcmp` 0.5-0.7x.

Detalhes: [Seis linguagens](/docs/real-world/six-languages).
