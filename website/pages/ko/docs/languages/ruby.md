---
title: Ruby
description: 원래 모듈 아래의 magnus 확장을 통해 Ruby 모듈 함수를 Rust로 포팅합니다.
---

# Ruby

| | |
| --- | --- |
| 유닛 | 모듈 함수가 든 파일 또는 폴더 |
| 브리지 | 원래 모듈 아래의 magnus 확장 |
| 기록과 재생 담당 | 생성된 Ruby 드라이버 |
| 필요 조건 | Ruby 3+ |
| 상태 | Ruby 3.3의 `shellwords.rb`에서 검증: 1,617/1,617 (446개는 예외 발생), 게이트 통과 |

타입은 YARD 태그에서 가져오며, 타입이 없지만 숫자로 쓰이는 매개변수는 숫자로 추론합니다. 배치는 `Mod::FnBatch.new(items)`이며, 배치 항목은 어떤 값이든 될 수 있습니다.

## 포트가 정확히 맞춰야 할 부분

- `downcase`는 Rust의 어말 시그마 규칙 없이 각 문자를 개별적으로 소문자로 바꿉니다.
- `Array#sum`은 Kahan-Babuska 합산을 사용하고 정수 0에서 시작하므로 `[-0.0].sum`은 `0.0`입니다.
- `Float#to_s`는 1e15부터 지수 형식을 씁니다(`1e15.to_s`는 `1.0e+15`, `1e14.to_s`는 `100000000000000.0`). 배열 안의 `nil.inspect`는 `nil`입니다.
- 동적 타이핑은 코드 비용을 늘립니다. `shellescape`가 무엇이든 받아들이기 때문에 `shellwords` 포트는 숫자, nil, 배열, 해시에 대한 Ruby의 `to_s`와 `inspect`를 다시 구현합니다.

## 속도

인터프리터가 충분히 느리므로 작은 함수도 이득을 봅니다. `shellwords`에서 `bench`는 포트가 호출당 Ruby보다 **4.4배 빠르다**고 측정했습니다(함수별 3.6-7x). 4코어에서 배치로 실행하면: 섞인 값 50,000개에 대한 `Shellwords.shellescape`(Ruby에서 88 ms)는 **11.8배 빨랐고**, 문자열 20,000개에 대한 `slugify`(110 ms)는 **12.7배** 빨랐습니다.

자세한 내용: [여섯 가지 언어](/docs/real-world/six-languages).
