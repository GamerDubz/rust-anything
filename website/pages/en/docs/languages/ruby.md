---
title: Ruby
description: Port Ruby module functions to Rust through a magnus extension under the original modules.
---

# Ruby

| | |
| --- | --- |
| Unit | a file or a folder of module functions |
| Bridge | a magnus extension under the original modules |
| Recorded and replayed by | a generated Ruby driver |
| Needs | Ruby 3+ |
| Status | Verified on `shellwords.rb` from Ruby 3.3: 1,617/1,617 (446 raise), gate passes |

Types come from YARD tags; untyped parameters used as numbers are inferred as numbers. Batches are `Mod::FnBatch.new(items)`, and batch items can be any value.

## What a port has to get right

- `downcase` lowers each character alone, without Rust's final-sigma rule.
- `Array#sum` uses Kahan-Babuska summation and starts from integer 0, so `[-0.0].sum` is `0.0`.
- `Float#to_s` uses exponent form from 1e15 up (`1e15.to_s` is `1.0e+15`, `1e14.to_s` is `100000000000000.0`); `nil.inspect` inside arrays is `nil`.
- Dynamic typing costs code: the `shellwords` port reimplements Ruby's `to_s` and `inspect` for numbers, nil, arrays and hashes, because `shellescape` accepts anything.

## Speed

The interpreter is slow enough that even small functions win. On `shellwords`, `bench` measured the port **4.4x faster** than Ruby per call (3.6-7x per function). As batches on 4 cores: `Shellwords.shellescape` over 50,000 mixed values (88 ms in Ruby) ran **11.8x faster**, and `slugify` over 20,000 strings (110 ms) **12.7x**.

Details: [Six languages](/docs/real-world/six-languages).
