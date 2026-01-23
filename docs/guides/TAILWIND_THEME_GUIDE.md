# Tailwind CSS Theme Integration Guide

## 📋 개요

Figma 대시보드 디자인(Node ID: 19:4148)에서 추출한 **Design Tokens**를 **Tailwind CSS** 테마로 변환하여 적용했습니다.

## 🎨 Tailwind Theme Configuration

`tailwind.config.js`에서 다음과 같이 설정되었습니다:

### 색상 (Colors)

#### Primary Colors
```js
'primary': {
  'default': '#007bee',
  'dark': '#005fa3',
  'light': '#4ca3ff',
}
```

#### Text Colors
```js
'text': {
  'primary': '#131416',      // 주요 텍스트
  'secondary': '#464c53',    // 보조 텍스트
  'muted': '#6d7882',        // 약화된 텍스트
  'disabled': '#aeb9c2',     // 비활성화
  'inverse': '#ffffff',      // 역상 텍스트
}
```

#### Background Colors
```js
'bg': {
  'primary': '#ffffff',
  'secondary': '#f4f5f6',
  'tertiary': '#e8eaed',
  'overlay': 'rgba(19, 20, 22, 0.16)',
}
```

#### Status Colors
```js
'status': {
  'success': '#28cf47',
  'warning': '#f39c12',
  'error': '#b11e24',
  'info': '#007bee',
}
```

### 타이포그래피 (Typography)

#### Font Sizes
```js
fontSize: {
  'xs': ['12px', { lineHeight: '16px' }],      // 라벨, 헬퍼 텍스트
  'sm': ['13px', { lineHeight: '20px' }],      // 부제, 부가 정보
  'base': ['14px', { lineHeight: '22px' }],    // 본문
  'lg': ['16px', { lineHeight: '24px' }],      // 강조 텍스트
  'xl': ['18px', { lineHeight: '28px' }],      // 제목
  '2xl': ['20px', { lineHeight: '28px' }],     // 부제목
  '3xl': ['24px', { lineHeight: '32px' }],     // 메인 제목
  '4xl': ['28px', { lineHeight: '36px' }],     // 대제목
}
```

#### Font Family
```js
fontFamily: {
  'pretendard': ['Pretendard', 'system-ui', 'sans-serif'],
  'spoqa': ['Spoqa Han Sans Neo', 'system-ui', 'sans-serif'],
}
```

#### Font Weight
```js
fontWeight: {
  'light': 300,
  'normal': 400,
  'medium': 500,
  'semibold': 600,
  'bold': 700,
}
```

### 간격 (Spacing)

```js
spacing: {
  'xs': '4px',
  'sm': '8px',
  'md': '12px',
  'lg': '16px',
  'xl': '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '40px',
}

gap: {
  'xs': '4px',
  'sm': '8px',
  'md': '12px',
  'lg': '16px',
  'xl': '20px',
  '2xl': '24px',
}
```

### 테두리 반경 (Border Radius)

```js
borderRadius: {
  'none': '0',
  'xs': '4px',
  'sm': '6px',
  'md': '8px',
  'lg': '12px',
  'full': '9999px',
}
```

## 🧩 업데이트된 컴포넌트

### 1. **Tag 컴포넌트**
상태를 시각적으로 표시하는 태그 컴포넌트

```tsx
import { Tag } from '@/components'

// 사용 예시
<Tag label="온도" state="default" />
<Tag label="습도" state="active" />
<Tag label="정상" state="success" size="sm" />
<Tag label="주의" state="warning" />
```

**Props:**
- `label`: 태그 텍스트
- `state`: 'default' | 'active' | 'success' | 'warning'
- `size`: 'sm' | 'md' (기본값: 'md')
- `onClick`: 클릭 이벤트 핸들러
- `className`: 추가 CSS 클래스

**Tailwind 클래스:**
```css
/* default */
bg-bg-secondary text-text-primary border border-border-weak

/* active */
bg-chart-secondary text-text-primary border border-chart-secondary

/* success */
bg-status-success bg-opacity-10 text-status-success border border-status-success

/* warning */
bg-status-error bg-opacity-10 text-status-error border border-status-error
```

---

### 2. **StatusBadge 컴포넌트**
상태를 표시하는 배지 컴포넌트

```tsx
import { StatusBadge } from '@/components'

// 사용 예시
<StatusBadge status="success" label="정상" />
<StatusBadge status="warning" label="주의" />
<StatusBadge status="error" label="오류" />
<StatusBadge status="active" label="활성화" />
```

**Props:**
- `status`: 'success' | 'warning' | 'active' | 'error'
- `label`: 배지 텍스트
- `className`: 추가 CSS 클래스

---

### 3. **WeatherCard 컴포넌트**
날씨 정보를 표시하는 카드

```tsx
import { WeatherCard } from '@/components'

// 사용 예시
<WeatherCard
  title="현재 날씨"
  temperature={25}
  humidity={45}
  windSpeed={3.2}
/>
```

**Props:**
- `title`: 카드 제목
- `temperature`: 온도 (숫자)
- `humidity`: 습도 (%)
- `windSpeed`: 풍속 (m/s)
- `weatherIcon`: 아이콘 (optional React Node)
- `className`: 추가 CSS 클래스

**Tailwind 클래스:**
```css
bg-bg-secondary border border-border-default rounded-sm p-6
font-pretendard text-text-secondary
```

---

### 4. **DataCard 컴포넌트**
데이터를 표시하는 일반 카드

```tsx
import { DataCard } from '@/components'

// 사용 예시
<DataCard 
  title="센서 정보" 
  subtitle="연돌 차압 정보"
  headerAction={<button>새로고침</button>}
>
  <div>압력: 3.22 Pa</div>
  <div>활성 장치: 24/24</div>
</DataCard>
```

**Props:**
- `title`: 카드 제목
- `subtitle`: 부제 (optional)
- `children`: 카드 콘텐츠
- `headerAction`: 헤더 액션 (optional)
- `className`: 추가 CSS 클래스

---

## 📁 파일 구조

```
src/
├── components/
│   ├── Tag.tsx                    # 태그 컴포넌트
│   ├── StatusBadge.tsx            # 상태 배지 컴포넌트
│   ├── WeatherCard.tsx            # 날씨 카드 컴포넌트
│   ├── DataCard.tsx               # 데이터 카드 컴포넌트
│   ├── Heatmap.tsx                # 히트맵 컴포넌트
│   └── index.ts                   # 컴포넌트 export
├── pages/
│   └── Dashboard.tsx              # 대시보드 페이지 (컴포넌트 import 추가)
├── styles/
│   ├── dashboard.css              # 대시보드 스타일
│   └── tokens.css                 # CSS 변수
└── index.css                       # Tailwind 지시문 (@tailwind ...)
```

---

## 🔧 Tailwind 설정 파일

### tailwind.config.js
- Figma Design Tokens를 Tailwind 테마로 정의
- 모든 색상, 타이포그래피, 간격, 테두리 반경 포함

### postcss.config.js
- PostCSS 플러그인 설정 (tailwindcss, autoprefixer)

---

## 💡 사용 예시

### 대시보드에서 컴포넌트 활용

```tsx
import { Tag, StatusBadge, WeatherCard, DataCard } from '@/components'

export default function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      {/* 태그 활용 */}
      <div className="flex gap-2">
        <Tag label="온도" state="active" />
        <Tag label="습도" state="default" />
      </div>

      {/* 날씨 카드 */}
      <WeatherCard
        title="현재 날씨"
        temperature={25}
        humidity={45}
        windSpeed={3.2}
      />

      {/* 데이터 카드 */}
      <DataCard
        title="센서 상태"
        subtitle="연돌 차압 시스템"
      >
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-text-muted text-sm">현재 압력</p>
            <p className="text-text-primary text-2xl font-bold">3.22 Pa</p>
          </div>
          <div>
            <p className="text-text-muted text-sm">활성 장치</p>
            <p className="text-text-primary text-2xl font-bold">24/24</p>
          </div>
          <div>
            <p className="text-text-muted text-sm">상태</p>
            <StatusBadge status="success" label="정상" />
          </div>
        </div>
      </DataCard>
    </div>
  )
}
```

---

## 🎯 Figma와의 동기화

모든 컴포넌트는 Figma 디자인(Node ID: 19:4148)을 기반으로 구현되었습니다.

**Design Tokens 출처:**
- 색상: Figma color variables
- 타이포그래피: Figma typography styles
- 간격: Figma design tokens
- 테두리 반경: Figma border radius tokens

---

## ✅ 체크리스트

- [x] Tailwind CSS 설치 및 설정
- [x] tailwind.config.js 생성
- [x] postcss.config.js 생성
- [x] Tag 컴포넌트 Tailwind 업데이트
- [x] StatusBadge 컴포넌트 Tailwind 업데이트
- [x] WeatherCard 컴포넌트 Tailwind 업데이트
- [x] DataCard 컴포넌트 Tailwind 업데이트
- [x] Dashboard import 추가
- [x] 테마 색상 정의
- [x] 테마 타이포그래피 정의
- [x] 테마 간격 정의

---

## 📚 추가 리소스

- [Tailwind CSS 공식 문서](https://tailwindcss.com)
- [Tailwind Config 커스터마이징](https://tailwindcss.com/docs/theme)
- [Figma → Tailwind 마이그레이션 가이드](https://tailwindcss.com/blog/tailwindcss-v3)

---

**작성일:** 2026-01-19  
**프로젝트:** react-vite-test  
**Tailwind Version:** 4.1.18  
**PostCSS Version:** 8.5.6
