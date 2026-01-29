# Copilot Agent Instructions

## 🚨 Figma API 접근 불가 시 처리 가이드

### 문제 상황

Figma MCP 도구 사용 시 다음과 같은 에러가 발생할 수 있습니다:

```
ERROR while calling tool: MCP server could not be started: 401 status 
sending message to https://mcp.figma.com/mcp: Unauthorized
```

### ⛔ 금지 사항: Figma API 없이 스타일 수정하지 말기

**Figma 메타데이터/스크린샷 도구에 접근할 수 없을 때:**

1. ❌ **컴포넌트 스타일 속성 수정 금지**
   - 색상 값 변경 금지
   - 크기/사이즈 값 변경 금지  
   - padding/margin 값 변경 금지
   - border-radius 값 변경 금지
   - line-height, letter-spacing 등 typography 변경 금지

2. ❌ **Figma 기반 새 컴포넌트 구현 금지**
   - Figma 디자인을 보지 못하면 정확한 사양을 알 수 없음
   - 정확하지 않은 구현으로 이어질 가능성 높음

3. ❌ **Figma 디자인 스펙 추측/가정 금지**
   - "아마 이 정도일 것" 같은 추정으로 값 설정하지 말 것
   - 정확한 픽셀 값이 필요한데 추측하면 후에 재작업 필요

### ✅ 허용 사항: Figma API 없이 할 수 있는 작업

1. ✅ **구조/로직 관련 작업**
   - 컴포넌트 Props 인터페이스 설계
   - 컴포넌트 트리/구조 개선
   - TypeScript 타입 정의

2. ✅ **코드 품질 개선**
   - 기존 스타일 리팩토링 (값 변경 없음)
   - 코드 포맷팅/정렬
   - 불필요한 코드 제거

3. ✅ **문서화 작업**
   - 주석/JSDoc 추가
   - README 업데이트
   - 스토리북 설명 작성

4. ✅ **빌드/설정 작업**
   - 빌드 에러 해결 (설정 파일 수정)
   - 의존성 문제 해결
   - 포트/환경 설정

### 🔧 발생 원인

```
401 Unauthorized Error
```

가능한 원인들:
- Figma API 토큰 만료/없음
- Figma MCP 서버 인증 설정 미완료  
- Figma 계정 권한 부족
- 네트워크/방화벽 문제

### 📋 조치 사항

**사용자에게 보고할 사항:**

```
Figma API에 접근할 수 없습니다. (401 Unauthorized)
이 상태에서는 디자인 스펙 확인 없이 스타일을 수정할 수 없습니다.

조치 필요:
1. Figma 인증 설정 확인
2. MCP 서버 설정 재점검
3. Figma API 토큰 갱신

위 작업이 완료될 때까지 스타일 수정은 진행할 수 없습니다.
```

---

## 📊 Figma → 컴포넌트 구현 체크리스트

Figma API가 정상 작동할 때는 **반드시 이 순서**로 진행:

### 1단계: Figma 디자인 스펙 완벽 파악

```
✅ mcp_figma_get_screenshot() 호출 → 시각 확인
✅ mcp_figma_get_metadata() 호출 → 정확한 치수 확인
```

**확인해야 할 항목:**
- [ ] 높이(height) - px 단위 정확값
- [ ] 너비(width) - px 단위 정확값  
- [ ] padding (상, 우, 하, 좌 각각)
- [ ] margin
- [ ] border-radius
- [ ] 배경색 (CSS 변수명 또는 hex값)
- [ ] 텍스트색
- [ ] 폰트 사이즈
- [ ] 폰트 두께
- [ ] line-height
- [ ] letter-spacing

### 2단계: 스타일 통합 원칙

**모든 스타일을 한 곳에서 관리:**

```typescript
// ✅ GOOD: 모든 크기 정보를 sizeStyles에 통합
const sizeStyles: Record<string, React.CSSProperties> = {
  sm: { 
    height: '24px',        // Figma에서 확인한 정확값
    paddingLeft: '10px',   // Figma에서 확인한 정확값
    paddingRight: '10px',  // Figma에서 확인한 정확값
    borderRadius: '4px',   // Figma에서 확인한 정확값
    lineHeight: '24px',    // height와 동일 (텍스트 수직 정렬)
  },
}

// ❌ BAD: 스타일을 분산 적용
// - height는 Tailwind 클래스 (h-6)
// - padding은 style prop
// - border-radius는 Tailwind 클래스 (rounded-sm)
// → 유지보수 어려움, 정확도 낮음
```

### 3단계: 검증

```typescript
// Storybook에서 시각적으로 확인
// ✅ Figma 디자인과 ±1px 오차 내 일치
```

---

## 📌 핵심 원칙

> **"Figma가 진실의 근원(Source of Truth)이다"**

Figma를 정확히 보지 못하면 정확한 구현은 불가능합니다.  
따라서 Figma API 접근 불가 상태에서는 **추측으로 스타일을 수정하지 말아야 합니다.**

---

## 🔗 관련 문서

- [Copilot Instructions](./copilot-instructions.md) - 일반 개발 규칙
- [Figma 디자인 파일](https://www.figma.com/design/OP6zTrlLC8m6DEJ6t5VSKK)
