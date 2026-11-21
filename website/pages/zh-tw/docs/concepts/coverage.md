---
title: 覆蓋率
description: 已錄製的案例執行了原始版本的多少程式碼，由 record 與 gate 針對 TypeScript/JavaScript 回報。
---

# 覆蓋率

通過 `diff` 代表移植版本與每個已錄製的案例一致。覆蓋率則告訴你這些案例執行了原始版本的多少程式碼，讓你知道錄製內容沒有涵蓋哪些部分。

對於 TypeScript/JavaScript，`record` 會根據 V8 的覆蓋率資料，量測案例執行了原始版本的哪些程式碼行，而 `gate` 會將它列為一項通過的參考性檢查：涵蓋的程式碼行比例，以及遺漏最多行的檔案。其他語言目前還不會量測。

在 Fuse.js 上，案例執行了該單元所匯入程式碼的 81%（[狀態](/docs/project/status)）。

## 提高覆蓋率

案例從未觸及的程式碼行，就是沒有人檢查過的行為。可以用以下方式觸及它們：

- `record --from-tests -- <test command>`，錄製原始版本自己的測試套件所做的每一次呼叫；
- `record --inputs`，搭配會走到自動產生的輸入所遺漏路徑的真實輸入（結構化參數、領域字串）。

請參閱[錄製](/docs/concepts/record)與[它抓不到的問題](/docs/concepts/limits)。
