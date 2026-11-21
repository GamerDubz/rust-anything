---
title: 픽스처와 정적 실행
description: 도구를 시험하려고 작성한 픽스처, 그리고 분석과 브리지까지만 하고 실행하지 않은 외부 라이브러리.
---

# 픽스처와 정적 실행

## 도구를 시험하려고 작성한 픽스처

| 픽스처 | 시험하는 것 | 결과 |
| --- | --- | --- |
| `tests/fixtures/async` | 두 브리지 모두에서의 async 함수 | 900/900, 두 게이트 모두 통과 |
| `tests/fixtures/classes` | 클래스: 상태, 생성자 오류, `Map` 순서, 이모지에 대한 `split('')` | 시나리오 600/600, 두 게이트 모두 통과 |
| `tests/fixtures/aliases` | `extends`, 주석, 후행 쉼표가 있는 tsconfig `paths` | analyze와 record가 이를 따라감 |
| `tests/fixtures/monorepo` | 빌드 출력이 없는 형제 패키지를 import하는 패키지 | record가 소스로 해석 |

도구에서 발견해 고친 것: napi가 `None`을 `null`로 바꿈(JS는 `undefined`를 냄), 시나리오가
너무 짧고 무작위적이라 상태가 있는 버그를 잡지 못함(이제 이전 문자열을 재사용하며 최대 12번 호출),
clippy가 거부하는 `let out = ()`와 즉시 호출되는 클로저를 생성함.
## 외부 라이브러리 (정적 분석만)

`unjs/scule`, `unjs/ufo`, `unjs/pathe`를 clone해서 분석하고 브리지했습니다. 이들의
코드를 실행하는 것(`record`는 원본을 실행함)은 인터넷에서 내려받은 코드에 대한 세션의 안전 정책에 따라
거부되었으므로, 이 실행들은 `record` 전에 멈춥니다.

| 라이브러리 | analyze | bridge |
| --- | --- | --- |
| scule (대소문자 변환) | 유닛 2개, ready | 아래 수정 후 함수 11개 모두 브리지 가능 |
| ufo (URL 유틸리티) | 유닛 7개, ready, `punycode.ts`가 1순위 | `toASCII` 브리지됨(타입 없는 JS: JSON으로 건너감) |
| pathe (경로 유틸리티) | 유닛 5개, `_glob.ts`는 주의(동적 정규식) | 함수 13개 브리지됨, `typeof path.join` 타입의 export는 JSON으로 건너감 |

도구에서 발견해 고친 것: 제약이 있는 제네릭(`camelCase<T extends string | readonly
string[]>`)을 "함수를 포함한 어떤 값이든"으로 취급해서, scule의 함수 11개 중 10개를
TS에 남겼습니다. 이제 데이터 제약이 있는 타입 매개변수는 그 제약으로 대체됩니다.

scule의 포트도 작성했습니다(`demo`에는 포함하지 않음: 원본과 대조해 기록한 적이 없음).
