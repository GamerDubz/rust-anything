---
title: Ruby
description: 透過位於原始模組底下的 magnus 擴充，將 Ruby 的 module 函式移植到 Rust。
---

# Ruby

| | |
| --- | --- |
| 單元 | 包含 module 函式的檔案或資料夾 |
| 橋接 | 位於原始模組底下的 magnus 擴充 |
| 錄製與重播方式 | 自動產生的 Ruby 驅動程式 |
| 需求 | Ruby 3+ |
| 狀態 | 已在 Ruby 3.3 的 `shellwords.rb` 上驗證：1,617/1,617（446 個 raise），gate 通過 |

型別來自 YARD 標籤；當作數字使用的未標型別參數會被推斷為數字。批次為 `Mod::FnBatch.new(items)`，而批次項目可以是任何值。

## 移植版本必須做對的地方

- `downcase` 會逐一轉換每個字元，不套用 Rust 的詞尾 sigma 規則。
- `Array#sum` 使用 Kahan-Babuska 求和並從整數 0 開始，所以 `[-0.0].sum` 是 `0.0`。
- `Float#to_s` 從 1e15 起使用指數形式（`1e15.to_s` 是 `1.0e+15`，`1e14.to_s` 是 `100000000000000.0`）；陣列中的 `nil.inspect` 是 `nil`。
- 動態型別需要付出程式碼的代價：`shellwords` 的移植版本為數字、nil、陣列與 hash 重新實作了 Ruby 的 `to_s` 與 `inspect`，因為 `shellescape` 接受任何值。

## 速度

直譯器慢到即使是小函式也能勝出。在 `shellwords` 上，`bench` 量測到移植版本單次呼叫比 Ruby **快 4.4x**（每個函式 3.6-7x）。改用 4 核心上的批次時：`Shellwords.shellescape` 處理 50,000 個混合值（Ruby 中需 88 ms）**快了 11.8x**，而 `slugify` 處理 20,000 個字串（110 ms）**快了 12.7x**。

詳情：[六種語言](/docs/real-world/six-languages)。
