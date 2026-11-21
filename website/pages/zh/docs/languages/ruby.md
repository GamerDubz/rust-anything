---
title: Ruby
description: 通过挂载在原模块下的 magnus 扩展，把 Ruby 模块函数迁移到 Rust。
---

# Ruby

| | |
| --- | --- |
| 单元 | 包含模块函数的文件或文件夹 |
| 桥接层 | 挂载在原模块下的 magnus 扩展 |
| 录制与回放方式 | 生成的 Ruby 驱动 |
| 依赖 | Ruby 3+ |
| 状态 | 已在 Ruby 3.3 的 `shellwords.rb` 上验证：1,617/1,617（446 条抛出异常），门禁通过 |

类型来自 YARD 标签；未标注类型但按数值使用的参数会被推断为数值。批处理通过 `Mod::FnBatch.new(items)` 创建，批处理的数据项可以是任意值。

## 移植版必须做对的地方

- `downcase` 逐个字符转小写，不使用 Rust 的词尾西格玛规则。
- `Array#sum` 使用 Kahan-Babuska 求和，并从整数 0 开始，所以 `[-0.0].sum` 是 `0.0`。
- `Float#to_s` 从 1e15 起使用指数形式（`1e15.to_s` 是 `1.0e+15`，`1e14.to_s` 是 `100000000000000.0`）；数组中的 `nil.inspect` 是 `nil`。
- 动态类型会带来额外代码：`shellwords` 移植版为数字、nil、数组和哈希重新实现了 Ruby 的 `to_s` 和 `inspect`，因为 `shellescape` 什么都接受。

## 速度

解释器足够慢，即使是小函数也能获益。在 `shellwords` 上，`bench` 测得移植版逐次调用比 Ruby **快 4.4 倍**（各函数为 3.6-7x）。改成 4 核批处理后：`Shellwords.shellescape` 处理 50,000 个混合值（Ruby 中 88 ms）**快 11.8 倍**，`slugify` 处理 20,000 个字符串（110 ms）**快 12.7 倍**。

详情：[六种语言](/docs/real-world/six-languages)。
