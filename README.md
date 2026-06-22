# cursor-demo

사용자 목록에서 이메일을 추출·검증·중복 제거하는 JavaScript 유틸리티 모듈입니다.

## 설치

```bash
npm install
```

## 테스트

```bash
npm test
```

## 사용 예시

```javascript
import { getUniqueValidEmails } from "./src/email.js";

const users = [
  { email: "User@Example.com" },
  { email: "user@example.com" },
  { email: "other@valid.org" },
  { email: "invalid" },
];

console.log(getUniqueValidEmails(users));
// ["User@Example.com", "other@valid.org"]
```

## API

| 함수 | 설명 |
| --- | --- |
| `extractEmails(users)` | 사용자 배열에서 `email` 필드를 추출한다 |
| `isValidEmail(email)` | RFC 5322 형식 및 RFC 5321 길이 제한으로 이메일을 검증한다 |
| `getValidEmails(users)` | 유효한 이메일만 필터링한다 |
| `getUniqueValidEmails(users)` | 유효한 이메일에서 대소문자 무시 기준 중복을 제거한다 |

---

## 릴리스 노트

### v1.0.0

**사용자 목록에서 이메일을 추출·검증·중복 제거하는 유틸리티 모듈을 제공하는 첫 공식 릴리스입니다.**

#### ✨ 기능

- **이메일 추출** — 사용자 객체 배열에서 `email` 필드를 추출하는 `extractEmails` 추가
- **이메일 검증** — RFC 5322 정규식과 RFC 5321 길이 제한(로컬 64자, 전체 254자)을 적용한 `isValidEmail` 추가
- **유효 이메일 필터링** — 검증을 통과한 이메일만 반환하는 `getValidEmails` 추가
- **중복 제거** — 대소문자 무시 기준으로 중복을 제거하는 `getUniqueValidEmails` 추가
- **테스트** — Node.js 내장 테스트 러너(`node --test`)로 6개 테스트 포함

#### 🐛 버그 수정

- 해당 없음 (초기 릴리스)

#### 🧹 기타

- ES Modules(`"type": "module"`) 프로젝트 구조 및 `npm test` 스크립트 설정
- 진입점 `src/index.js` 추가
