# Typography Implementation Guide

## 📋 개요

Typography는 Figma 디자인 시스템에서 정의되어 있으며, `figma-design-tokens.json`을 통해 프로젝트에 적용됩니다.

**현재 구조:**
- `figma-design-tokens.json`의 `global.heading`, `global.body`, `global.caption` 정의됨
- Style Dictionary가 이를 CSS 변수로 변환
- Tailwind Config에서 이를 활용

---

## 🔄 구현 흐름

```
figma-design-tokens.json (Tokens Studio에서 관리)
    ↓
Style Dictionary 빌드 (pnpm build)
    ↓
design-tokens/build/css/variables.css (CSS 변수 생성)
    ↓
tailwind.config.js (fontSize 매핑)
    ↓
컴포넌트에서 사용
```

---

## 1️⃣ Step 1: 현재 정의된 Typography 토큰 확인

### figma-design-tokens.json 구조

```json
{
  "global": {
    "heading": {
      "00": { fontSize: 24, fontWeight: "Bold", lineHeight: "140%" },
      "01": { fontSize: 20, fontWeight: "SemiBold", lineHeight: "140%" },
      "02": { fontSize: 18, fontWeight: "Bold", lineHeight: "140%" },
      "03": { fontSize: 18, fontWeight: "SemiBold", lineHeight: "140%" },
      "04": { fontSize: 16, fontWeight: "Bold", lineHeight: "140%" },
      "05": { fontSize: 16, fontWeight: "SemiBold", lineHeight: "140%" }
    },
    "body": {
      "01": { fontSize: 14, fontWeight: "Bold", lineHeight: "140%" },
      "02": { fontSize: 14, fontWeight: "SemiBold", lineHeight: "140%" },
      "03": { fontSize: 14, fontWeight: "Medium", lineHeight: "140%" },
      "04": { fontSize: 14, fontWeight: "Regular", lineHeight: "140%" }
    },
    "caption": {
      "01": { fontSize: 12, fontWeight: "SemiBold", lineHeight: "140%" },
      "02": { fontSize: 12, fontWeight: "Medium", lineHeight: "140%" },
      "03": { fontSize: 12, fontWeight: "Regular", lineHeight: "140%" }
    }
  }
}
```

### 토큰 상세 정보

#### Heading

| 토큰 | 폰트 크기 | 폰트 무게 | 라인 높이 | 용도 |
|------|---------|---------|---------|------|
| heading-00 | 24px | Bold (700) | 140% | 매우 큰 제목 |
| heading-01 | 20px | SemiBold (600) | 140% | 큰 제목 |
| heading-02 | 18px | Bold (700) | 140% | 중간 제목 1 |
| heading-03 | 18px | SemiBold (600) | 140% | 중간 제목 2 |
| heading-04 | 16px | Bold (700) | 140% | 작은 제목 1 |
| heading-05 | 16px | SemiBold (600) | 140% | 작은 제목 2 |

#### Body

| 토큰 | 폰트 크기 | 폰트 무게 | 라인 높이 | 용도 |
|------|---------|---------|---------|------|
| body-01 | 14px | Bold (700) | 140% | 강조된 본문 |
| body-02 | 14px | SemiBold (600) | 140% | 강조된 본문 2 |
| body-03 | 14px | Medium (500) | 140% | 일반 본문 |
| body-04 | 14px | Regular (400) | 140% | 기본 본문 |

#### Caption

| 토큰 | 폰트 크기 | 폰트 무게 | 라인 높이 | 용도 |
|------|---------|---------|---------|------|
| caption-01 | 12px | SemiBold (600) | 140% | 강조된 캡션 |
| caption-02 | 12px | Medium (500) | 140% | 일반 캡션 |
| caption-03 | 12px | Regular (400) | 140% | 기본 캡션 |

---

## 2️⃣ Step 2: Style Dictionary 빌드

### CSS 변수 생성

```bash
cd packages/design-tokens
pnpm build
```

### 생성된 CSS 변수

```css
/* design-tokens/build/css/variables.css */

/* Heading */
--heading-00-fontfamily: Pretendard;
--heading-00-fontweight: Bold;
--heading-00-lineheight: 140%;
--heading-00-fontsize: 24;
--heading-00-letterspacing: -0.5;

--heading-01-fontsize: 20;
--heading-01-fontweight: SemiBold;
--heading-01-lineheight: 140%;

--heading-02-fontsize: 18;
--heading-02-fontweight: Bold;
--heading-02-lineheight: 140%;

--heading-03-fontsize: 18;
--heading-03-fontweight: SemiBold;
--heading-03-lineheight: 140%;

--heading-04-fontsize: 16;
--heading-04-fontweight: Bold;
--heading-04-lineheight: 140%;

--heading-05-fontsize: 16;
--heading-05-fontweight: SemiBold;
--heading-05-lineheight: 140%;

/* Body */
--body-01-fontsize: 14;
--body-01-fontweight: Bold;
--body-01-lineheight: 140%;

--body-02-fontsize: 14;
--body-02-fontweight: SemiBold;
--body-02-lineheight: 140%;

--body-03-fontsize: 14;
--body-03-fontweight: Medium;
--body-03-lineheight: 140%;

--body-04-fontsize: 14;
--body-04-fontweight: Regular;
--body-04-lineheight: 140%;

/* Caption */
--caption-01-fontsize: 12;
--caption-01-fontweight: SemiBold;
--caption-01-lineheight: 140%;

--caption-02-fontsize: 12;
--caption-02-fontweight: Medium;
--caption-02-lineheight: 140%;

--caption-03-fontsize: 12;
--caption-03-fontweight: Regular;
--caption-03-lineheight: 140%;
```

---

## 3️⃣ Step 3: Tailwind Config에 매핑

### tailwind.config.js 확장

```javascript
export default {
  theme: {
    extend: {
      fontSize: {
        // Heading - CSS 변수 참조
        'heading-00': [
          'var(--heading-00-fontsize, 24px)',
          {
            fontWeight: 'var(--heading-00-fontweight, 700)',
            lineHeight: 'var(--heading-00-lineheight, 140%)',
            letterSpacing: 'var(--heading-00-letterspacing, -0.5px)',
          }
        ],
        'heading-01': [
          'var(--heading-01-fontsize, 20px)',
          {
            fontWeight: 'var(--heading-01-fontweight, 600)',
            lineHeight: 'var(--heading-01-lineheight, 140%)',
            letterSpacing: 'var(--heading-01-letterspacing, -0.5px)',
          }
        ],
        'heading-02': [
          'var(--heading-02-fontsize, 18px)',
          {
            fontWeight: 'var(--heading-02-fontweight, 700)',
            lineHeight: 'var(--heading-02-lineheight, 140%)',
            letterSpacing: 'var(--heading-02-letterspacing, -0.5px)',
          }
        ],
        'heading-03': [
          'var(--heading-03-fontsize, 18px)',
          {
            fontWeight: 'var(--heading-03-fontweight, 600)',
            lineHeight: 'var(--heading-03-lineheight, 140%)',
            letterSpacing: 'var(--heading-03-letterspacing, -0.5px)',
          }
        ],
        'heading-04': [
          'var(--heading-04-fontsize, 16px)',
          {
            fontWeight: 'var(--heading-04-fontweight, 700)',
            lineHeight: 'var(--heading-04-lineheight, 140%)',
            letterSpacing: 'var(--heading-04-letterspacing, -0.5px)',
          }
        ],
        'heading-05': [
          'var(--heading-05-fontsize, 16px)',
          {
            fontWeight: 'var(--heading-05-fontweight, 600)',
            lineHeight: 'var(--heading-05-lineheight, 140%)',
            letterSpacing: 'var(--heading-05-letterspacing, -0.5px)',
          }
        ],

        // Body
        'body-01': [
          'var(--body-01-fontsize, 14px)',
          {
            fontWeight: 'var(--body-01-fontweight, 700)',
            lineHeight: 'var(--body-01-lineheight, 140%)',
          }
        ],
        'body-02': [
          'var(--body-02-fontsize, 14px)',
          {
            fontWeight: 'var(--body-02-fontweight, 600)',
            lineHeight: 'var(--body-02-lineheight, 140%)',
          }
        ],
        'body-03': [
          'var(--body-03-fontsize, 14px)',
          {
            fontWeight: 'var(--body-03-fontweight, 500)',
            lineHeight: 'var(--body-03-lineheight, 140%)',
          }
        ],
        'body-04': [
          'var(--body-04-fontsize, 14px)',
          {
            fontWeight: 'var(--body-04-fontweight, 400)',
            lineHeight: 'var(--body-04-lineheight, 140%)',
          }
        ],

        // Caption
        'caption-01': [
          'var(--caption-01-fontsize, 12px)',
          {
            fontWeight: 'var(--caption-01-fontweight, 600)',
            lineHeight: 'var(--caption-01-lineheight, 140%)',
          }
        ],
        'caption-02': [
          'var(--caption-02-fontsize, 12px)',
          {
            fontWeight: 'var(--caption-02-fontweight, 500)',
            lineHeight: 'var(--caption-02-lineheight, 140%)',
          }
        ],
        'caption-03': [
          'var(--caption-03-fontsize, 12px)',
          {
            fontWeight: 'var(--caption-03-fontweight, 400)',
            lineHeight: 'var(--caption-03-lineheight, 140%)',
          }
        ],
      },
    },
  },
}
```

---

## 4️⃣ Step 4: Tailwind 클래스 사용

### HTML에서 바로 사용

```html
<!-- Heading -->
<h1 class="text-heading-01">큰 제목</h1>
<h2 class="text-heading-03">중간 제목</h2>
<h3 class="text-heading-05">작은 제목</h3>

<!-- Body -->
<p class="text-body-03">일반 본문 텍스트</p>
<p class="text-body-01">강조된 본문 텍스트</p>

<!-- Caption -->
<span class="text-caption-01">강조된 캡션</span>
<span class="text-caption-03">일반 캡션</span>
```

### React 컴포넌트에서 사용

```typescript
<h1 className="text-heading-01">제목</h1>
<p className="text-body-04">본문</p>
<span className="text-caption-02">캡션</span>
```

---

## 5️⃣ Step 5: Badge 컴포넌트에 Typography 적용

### Badge 크기별 Typography 매핑

| Badge 크기 | Typography | 폰트크기 | 폰트무게 |
|----------|-----------|---------|---------|
| sm | caption-01 | 12px | SemiBold (600) |
| md | body-04 | 14px | Regular (400) |
| lg | body-03 | 14px | Medium (500) |

### Badge.tsx 수정

```typescript
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

// 색상 정의
const backgroundColors: Record<string, string> = {
  gray: 'var(--Color-Background-color-background-tertiary)',
  green: 'var(--Color-Support-color-support-success-subtle)',
  blue: 'var(--Color-Support-color-support-info-subtle)',
  red: 'var(--Color-Support-color-support-error-subtle)',
  yellow: 'var(--Color-Support-color-support-yellow)',
  black: 'var(--Color-Button-color-button-secondary)',
}

const textColors: Record<string, string> = {
  gray: 'var(--Color-Text-color-text-tertiary)',
  green: 'var(--Color-Text-color-text-identity)',
  blue: 'var(--Color-Support-color-support-info)',
  red: 'var(--Color-Support-color-support-error)',
  yellow: 'var(--Color-Support-color-support-brown)',
  black: 'var(--Color-Text-color-text-primary-inverse)',
}

// 크기별 스타일 (높이, 패딩, 보더)
const sizeStyles: Record<string, React.CSSProperties> = {
  sm: { 
    height: '24px', 
    paddingLeft: '10px', 
    paddingRight: '10px', 
    lineHeight: '24px', 
    borderRadius: '4px' 
  },
  md: { 
    height: '28px', 
    paddingLeft: '10px', 
    paddingRight: '10px', 
    lineHeight: '28px', 
    borderRadius: '4px' 
  },
  lg: { 
    height: '30px', 
    paddingLeft: '12px', 
    paddingRight: '12px', 
    lineHeight: '30px', 
    borderRadius: '4px' 
  },
}

const badgeVariants = cva(
  'font-semibold transition-colors whitespace-nowrap',
  {
    variants: {
      size: {
        sm: 'text-caption-01',    // 12px, SemiBold
        md: 'text-body-04',       // 14px, Regular
        lg: 'text-body-03',       // 14px, Medium
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  color?: 'gray' | 'green' | 'blue' | 'red' | 'yellow' | 'black'
  size?: 'sm' | 'md' | 'lg'
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, color = 'gray', size = 'sm', style, ...props }, ref) => (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColors[color],
        color: textColors[color],
        ...sizeStyles[size],
        ...style,
      }}
      className={cn(badgeVariants({ size, className }))}
      ref={ref}
      {...props}
    />
  )
)

Badge.displayName = 'Badge'
```

---

## ✅ 구현 체크리스트

- [ ] `pnpm build` 실행하여 CSS 변수 생성 확인
- [ ] `tailwind.config.js`에 fontSize 매핑 추가
- [ ] `text-heading-01`, `text-body-04`, `text-caption-01` 등 클래스 생성 확인
- [ ] Badge 컴포넌트의 CVA에 typography 클래스 적용
- [ ] Storybook에서 시각적 확인
- [ ] 다른 텍스트 기반 컴포넌트에도 동일하게 적용

---

## 🎯 Best Practices

### ✅ 권장 사항

```typescript
// 1. Tailwind 클래스로 typography 적용 (가장 깨끗함)
className="text-body-03"

// 2. CSS 변수 직접 사용 (동적 선택이 필요할 때)
style={{
  fontSize: 'var(--body-03-fontsize)',
  fontWeight: 'var(--body-03-fontweight)',
}}

// 3. 크기별 매핑 (컴포넌트에서)
const typographyMap = {
  sm: 'text-caption-01',
  md: 'text-body-04',
  lg: 'text-body-03',
}

className={typographyMap[size]}
```

### ❌ 피해야 할 것

```typescript
// ❌ BAD: 하드코딩된 값
fontSize: '14px',
fontWeight: 600,

// ❌ BAD: figma-design-tokens.json 직접 수정
// 항상 Tokens Studio for Figma에서 관리하고 export

// ❌ BAD: CSS 변수를 문자열로 사용
style={{ fontWeight: 'body-03' }}  // ❌ 잘못됨
```

---

## 🔗 관련 파일

- [tailwind.config.js](../../tailwind.config.js) - Typography 매핑
- [packages/design-tokens/figma-design-tokens.json](../../packages/design-tokens/figma-design-tokens.json) - 토큰 정의
- [packages/design-system/src/components/Badge.tsx](../../packages/design-system/src/components/Badge.tsx) - Badge 컴포넌트
- [copilot-instructions.md](./copilot-instructions.md) - 전체 개발 규칙

---

## 📌 다음 단계

1. **figma-design-tokens.json** 확인 ✓
2. **Style Dictionary 빌드** → `pnpm build`
3. **tailwind.config.js** 업데이트 (위의 fontSize 매핑 추가)
4. **Badge.tsx** CVA에 `text-caption-01`, `text-body-04`, `text-body-03` 적용
5. **Storybook에서 확인** → typography가 정확히 적용되었는지 시각적 검증
