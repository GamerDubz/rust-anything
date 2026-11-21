---
title: 测试夹具与静态运行
description: 为给工具施压而编写的测试夹具，以及做了分析和桥接但没有运行的外部库。
---

# 测试夹具与静态运行

## 为给工具施压而编写的测试夹具

| 测试夹具 | 测试内容 | 结果 |
| --- | --- | --- |
| `tests/fixtures/async` | 两种桥接层上的异步函数 | 900/900，两个门禁都通过 |
| `tests/fixtures/classes` | 类：状态、构造函数错误、`Map` 顺序、对 emoji 执行 `split('')` | 600/600 个场景，两个门禁都通过 |
| `tests/fixtures/aliases` | 带 `extends`、注释和尾随逗号的 tsconfig `paths` | analyze 和 record 都能正确处理 |
| `tests/fixtures/monorepo` | 一个导入了没有构建产物的同级包的包 | record 会把它解析到源码 |

在工具中发现并已修复的问题：napi 把 `None` 转成了 `null`（JS 给出的是 `undefined`）；场景
太短、太随机，抓不到有状态的 bug（现在最多 12 次调用，并复用之前的字符串）；
生成了会被 clippy 拒绝的 `let out = ()` 和立即调用的闭包。
## 外部库（仅静态）

`unjs/scule`、`unjs/ufo` 和 `unjs/pathe` 被克隆下来并做了分析和桥接。运行它们的
代码（`record` 会执行原实现）被会话针对从互联网下载代码的安全策略拒绝，
所以这些运行在 `record` 之前就停止了。

| 库 | analyze | bridge |
| --- | --- | --- |
| scule（大小写转换） | 2 个单元，就绪 | 下面的修复之后，全部 11 个函数都可以桥接 |
| ufo（URL 工具） | 7 个单元，就绪；`punycode.ts` 排在第一 | 已桥接 `toASCII`（无类型的 JS：以 JSON 跨边界） |
| pathe（路径工具） | 5 个单元；`_glob.ts` 需注意（动态正则） | 已桥接 13 个函数；类型为 `typeof path.join` 的导出项以 JSON 跨边界 |

在工具中发现并已修复的问题：带约束的泛型（`camelCase<T extends string | readonly
string[]>`）被当作“任意值，包括函数”，导致 scule 的 11 个
函数中有 10 个被留在 TS 中。现在带数据类型约束的类型参数会被替换为其约束类型。

scule 的移植版已经写好了（不包含在 `demo` 中：它从未对照原实现录制过）。
