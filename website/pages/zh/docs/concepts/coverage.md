---
title: 覆盖率
description: 录制用例运行了原实现的多少代码，由 record 和 gate 针对 TypeScript/JavaScript 报告。
---

# 覆盖率

通过 `diff` 表示移植版与每条录制用例一致。覆盖率告诉你这些用例运行了原实现的多少代码，让你知道录制结果没有覆盖到哪些部分。

对于 TypeScript/JavaScript，`record` 会根据 V8 的覆盖率数据测量这些用例运行了原实现的哪些行，`gate` 会把它作为一项始终通过、仅供参考的检查打印出来：覆盖到的行占比，以及遗漏行数最多的文件。其他语言目前还不测量覆盖率。

在 Fuse.js 上，这些用例运行了该单元导入的代码中 81% 的行（[项目状态](/docs/project/status)）。

## 提高覆盖率

用例从未到达的行，就是没人检查过的行为。可以通过以下方式覆盖它们：

- `record --from-tests -- <test command>`，录制原实现自身测试套件发出的每一次调用；
- `record --inputs`，使用能走到生成用例遗漏路径的真实输入（结构化参数、领域相关字符串）。

见[录制](/docs/concepts/record)和[它捕获不到什么](/docs/concepts/limits)。
