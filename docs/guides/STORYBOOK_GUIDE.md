# Storybook 가이드

**작성일**: 2026년 1월 19일
**Storybook 버전**: 8.x
**포트**: 6006

---

## 📖 Storybook이란?

Storybook은 UI 컴포넌트들을 격리된 환경에서 개발하고 테스트할 수 있는 도구입니다.
각 컴포넌트의 모든 상태를 시각적으로 확인할 수 있습니다.

---

## 🚀 Storybook 시작하기

### 설치 (이미 완료됨)
```bash
pnpm add -D storybook @storybook/react @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-links
```

### 개발 서버 실행
```bash
pnpm storybook
```

브라우저가 자동으로 열리고 `http://localhost:6006`에서 Storybook을 확인할 수 있습니다.

### 빌드 (프로덕션)
```bash
pnpm build:storybook
```

`storybook-static` 디렉토리에 정적 HTML이 생성됩니다.

---

## 📁 디렉토리 구조

```
.storybook/
├── main.ts           # Storybook 메인 설정
└── preview.ts        # 전역 설정 및 데코레이터

src/stories/
├── Overview.stories.tsx           # 전체 컴포넌트 전시 페이지
├── 
├── 라이브러리 컴포넌트
│   ├── Button.stories.tsx         # 버튼
│   ├── ButtonElement.stories.tsx  # 버튼 요소
│   ├── ButtonPagination.stories.tsx # 페이지네이션 버튼
│   ├── Checkbox.stories.tsx       # 체크박스
│   ├── DatePicker.stories.tsx     # 날짜 선택기
│   ├── DatePickerModal.stories.tsx # 날짜 선택 모달
│   ├── Dropdown.stories.tsx       # 드롭다운
│   └── DropdownElement.stories.tsx # 드롭다운 요소
│
└── 대시보드 컴포넌트
    ├── DataCard.stories.tsx       # 데이터 카드
    ├── StatusBadge.stories.tsx    # 상태 뱃지
    ├── Tag.stories.tsx            # 태그
    ├── WeatherCard.stories.tsx    # 날씨 카드
    └── Heatmap.stories.tsx        # 히트맵
```

---

## 🎨 컴포넌트별 Story 구성

### Figma 라이브러리 컴포넌트 (9개)

#### 1. Button (4:2148)
- **파일**: Button.stories.tsx
- **Stories**:
  - Primary: 기본 파란색 버튼
  - PrimaryLarge: 크기가 큰 버튼
  - Secondary: 보조 버튼
  - Tertiary: 테두리 스타일 버튼
  - Disabled: 비활성화 상태
  - WithIcon: 아이콘 포함

#### 2. ButtonElement (4:2233)
- **파일**: ButtonElement.stories.tsx
- **Stories**:
  - Default: 기본 상태
  - Hover: 호버 상태
  - Select: 선택됨 상태
  - Keep: 유지 상태
  - Today: 오늘 표시
  - Holiday: 휴일 표시
  - Disabled: 비활성화
  - WithIcon: 아이콘 포함
  - CalendarGrid: 달력 그리드 예시

#### 3. ButtonPagination (4:825)
- **파일**: ButtonPagination.stories.tsx
- **Stories**:
  - Default: 기본 상태
  - Hover: 호버 상태
  - Selected: 선택됨 상태
  - Disabled: 비활성화
  - WithIcon: 아이콘 포함
  - Pagination: 페이지네이션 예시

#### 4. Checkbox (447:3009)
- **파일**: Checkbox.stories.tsx
- **Stories**:
  - Default: 기본 상태
  - Hover: 호버 상태
  - Selected: 선택됨 상태
  - Multiple: 여러 체크박스

#### 5. DatePicker (4:799)
- **파일**: DatePicker.stories.tsx
- **Stories**:
  - Default: 기본 상태
  - Hover: 호버 상태
  - Selected: 선택됨 상태
  - Disabled: 비활성화

#### 6. DatePickerModal (4:602)
- **파일**: DatePickerModal.stories.tsx
- **Stories**:
  - DateOptions: 달력 모드
  - MonthOptions: 월 선택 모드
  - YearOptions: 연도 선택 모드
  - ConsecutiveDateOption: 범위 선택 모드

#### 7. Dropdown (4:2396, 4:2397)
- **파일**: Dropdown.stories.tsx
- **Stories**:
  - Default: 기본 상태
  - Disabled: 비활성화
  - Selected: 선택됨(열린) 상태
  - WithOptions: 옵션 포함

#### 8. DropdownElement (4:2420)
- **파일**: DropdownElement.stories.tsx
- **Stories**:
  - Default: 기본 상태
  - Hover: 호버 상태
  - Click: 클릭 상태
  - DropdownMenu: 메뉴 예시

### 대시보드 컴포넌트 (6개)

#### 1. DataCard
- **파일**: DataCard.stories.tsx
- **Stories**:
  - Default: 기본 데이터 카드
  - WithAction: 액션 버튼 포함
  - Multiple: 여러 카드 그리드

#### 2. StatusBadge
- **파일**: StatusBadge.stories.tsx
- **Stories**:
  - Success: 성공 상태
  - Active: 진행 중 상태
  - Warning: 경고 상태
  - Error: 오류 상태
  - All: 모든 상태

#### 3. Tag
- **파일**: Tag.stories.tsx
- **Stories**:
  - Default: 기본 태그
  - Active: 활성 태그
  - Success: 성공 태그
  - Warning: 경고 태그
  - Multiple: 여러 태그

#### 4. WeatherCard
- **파일**: WeatherCard.stories.tsx
- **Stories**:
  - Default: 일반적인 날씨
  - Cold: 추운 날씨
  - Hot: 더운 날씨
  - Rainy: 비오는 날씨

#### 5. Heatmap
- **파일**: Heatmap.stories.tsx
- **Stories**:
  - Default: CO2 배출량 히트맵
  - Temperature: 온도 분포 히트맵

### Overview 페이지
- **파일**: Overview.stories.tsx
- **설명**: 모든 컴포넌트를 한 페이지에서 볼 수 있습니다.
- **카테고리**:
  - Figma 라이브러리 컴포넌트
  - 대시보드 컴포넌트

---

## 📝 Story 파일 작성 방식

### 기본 구조
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import MyComponent from '../../components/MyComponent';

const meta = {
  title: '카테고리/컴포넌트명',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Props 정의
    prop1: {
      control: 'select',
      options: ['option1', 'option2'],
    },
  },
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prop1: 'option1',
  },
};
```

### argTypes 설정 가능한 옵션
- `control`: 'select' | 'boolean' | 'text' | 'number' | 'color'
- `options`: 선택 옵션 배열
- `description`: Props 설명

---

## 🎯 Storybook 활용 팁

### 1. Docs 자동 생성
`tags: ['autodocs']`를 설정하면 자동으로 문서가 생성됩니다.

### 2. Args 검증
Props를 변경하면 실시간으로 컴포넌트가 업데이트됩니다.

### 3. Addon 활용
- **Essentials**: 기본 기능 (Actions, Controls, Docs)
- **Interactions**: 사용자 상호작용 테스트
- **Links**: 컴포넌트 간 링크

### 4. 화면 크기 테스트
좌측 toolbar의 "Viewport" 옵션으로 반응형 디자인을 테스트할 수 있습니다.

---

## 📊 컴포넌트 계층 구조

```
Overview (전체 전시)
├─ Figma 라이브러리 컴포넌트
│  ├─ Button
│  ├─ ButtonElement
│  ├─ ButtonPagination
│  ├─ Checkbox
│  ├─ DatePicker
│  ├─ DatePickerModal
│  ├─ Dropdown
│  └─ DropdownElement
└─ 대시보드 컴포넌트
   ├─ DataCard
   ├─ StatusBadge
   ├─ Tag
   ├─ WeatherCard
   └─ Heatmap
```

---

## 🔧 커스터마이징

### 테마 추가
[.storybook/preview.ts]에서 글로벌 스타일 추가:
```typescript
import '../src/index.css';
```

### 애드온 추가
[.storybook/main.ts]에서 addons 배열에 추가:
```typescript
addons: [
  '@storybook/addon-essentials',
  '@storybook/addon-interactions',
  '@storybook/addon-links',
  // 새로운 애드온 추가
]
```

---

## 📱 배포

### GitHub Pages 배포
```bash
pnpm build:storybook
# storybook-static 폴더를 배포
```

### Vercel 배포
```bash
# vercel.json 생성
{
  "buildCommand": "pnpm build:storybook",
  "outputDirectory": "storybook-static"
}
```

---

## 🆘 문제 해결

### Storybook이 시작되지 않음
```bash
rm -rf node_modules/.cache
pnpm storybook
```

### 스타일이 적용되지 않음
- `src/index.css`가 `.storybook/preview.ts`에 import되어 있는지 확인
- Tailwind CSS 설정 확인

### 컴포넌트가 표시되지 않음
- Story 파일의 `component` 설정 확인
- Import 경로 확인

---

## 📚 더 알아보기

- [Storybook 공식 문서](https://storybook.js.org/)
- [Storybook for React](https://storybook.js.org/docs/react)
- [Storybook Addons](https://storybook.js.org/addons)

---

**마지막 업데이트**: 2026년 1월 19일
