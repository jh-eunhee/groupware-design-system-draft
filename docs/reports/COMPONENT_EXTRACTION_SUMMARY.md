# Figma 컴포넌트 라이브러리 추출 보고서

추출일: 2025년 1월
Figma 파일: Design System (rRI5RbFDfeZV9X8wMdTcz9)

---

## 📋 목차
1. [컴포넌트별 정보](#컴포넌트별-정보)
2. [컴포넌트 관계도](#컴포넌트-관계도)
3. [사용 가이드](#사용-가이드)

---

## 컴포넌트별 정보

### 1. Button (버튼)
**노드 ID**: `4:2148`

**Properties**:
- `type`: 'primary' | 'secondary' | 'tertiary' | 'info'
- `size`: 'Default' | 'small' | 'large'  
- `state`: 'default' | 'hover' | 'pressed' | 'disabled' | '설명문구1' | '설명문구2' | '설명문구3' | '설명문구4' | '설명문구5'
- `icon`: boolean (아이콘 표시 여부)

**특징**:
- 12가지 type/size/state 조합 제공
- Primary: #007bee (기본), #2a98ff (hover), #67b6ff (pressed)
- Secondary: #c8f0f6 (기본), #aae8f1 (hover), #84deea (pressed)
- Tertiary: 테두리 스타일
- Disabled 상태에서 40% opacity
- 선택적 아이콘 포함

**생성된 코드**: [button.tsx](./src/components/Button.tsx)

---

### 2. Button Element (버튼 요소)
**노드 ID**: `4:2233`

**Properties**:
- `property1`: 'Default' | 'hover' | 'select' | 'keep' | 'disable' | 'today' | 'Holiday' | 'desabled'
- `rectangle`: boolean (사각형 모양 옵션)
- `icon`: boolean (아이콘 표시 여부)

**특징**:
- 날짜 선택 컴포넌트에 사용되는 기본 요소
- 15가지 상태 조합 제공
- Select 상태: #84deea (하늘색)
- Keep 상태: #e0f7fa (연한 하늘색)
- Disable 상태: rgba(255,255,255,0.05) 배경, #aeb9c2 텍스트
- 원형 또는 사각형 선택 가능
- 오른쪽 방향 아이콘 포함 가능

**관계**: Button 컴포넌트의 기본 구성 요소, DatePicker와 DatePickerModal에서 활용

---

### 3. Button Pagination (페이지네이션 버튼)
**노드 ID**: `4:825`

**Properties**:
- `state`: 'default' | 'hover' | 'selected' | 'disabled'
- `icon`: boolean (페이지 아이콘 표시)

**특징**:
- 8가지 상태 조합 (4 states × 2 icon options)
- Selected: #aae8f1 배경
- Hover: rgba(38,198,218,0.1) 배경
- Disabled: rgba(255,255,255,0.05) 배경
- 크기: 24px (작은 크기로 페이지 번호 표시)

---

### 4. Checkbox (체크박스)
**노드 ID**: `447:3009`

**Properties**:
- `property1`: 'select' | 'default' | 'hover'

**특징**:
- 간단한 체크 상태 표현
- 흰색 체크 마크 아이콘 포함
- 이진 상태 (체크됨/미체크됨)
- 작은 크기 (6px × 10px 체크 마크)

---

### 5. Date Picker (날짜 선택기)
**노드 ID**: `4:799`

**Properties**:
- `property1`: 'selected' | 'disabled' | 'default' | 'hover'

**특징**:
- 4가지 상태 제공
- Disabled: rgba(0,0,0,0.05) 배경
- Hover: rgba(255,255,255,0.8) 배경
- Selected: DatePickerModal과 함께 전체 날짜 선택 화면 표시
- 날짜 아이콘 포함
- 텍스트 포맷: 'YYYY.MM.DD'

**관계**: DatePickerModal과 함께 작동하여 완전한 날짜 선택 인터페이스 제공

---

### 6. Date Picker Modal (날짜 선택 모달)
**노드 ID**: `4:602`

**Properties**:
- `property1`: 'date options' | 'month options' | 'year options' | 'consecutive date option'

**특징**:
- 4가지 모드별 UI 제공
- Backdrop blur 효과 (20px)
- Gradient 배경: white → rgba(255,255,255,0.8)
- Border: 0.5px white
- Drop shadow: rgba(0,51,109,0.2)

**모드별 상세**:
1. **date options**: 전체 달력 표시
   - 요일 헤더 (일~토)
   - 날짜 그리드
   - 오늘 버튼 (테두리)
   - 휴일 표시 (빨간색 #f0312b)
   - 비활성 날짜 (회색)

2. **month options**: 월 선택
   - 1월~12월 버튼 그리드
   - 월별 상호작용

3. **year options**: 연도 선택
   - 1998년부터 2025년까지 표시
   - 스크롤 가능한 리스트

4. **consecutive date option**: 연속 날짜 선택
   - 시작~종료 날짜 선택
   - 선택된 범위 하이라이트

**관계**: DatePicker의 selected 상태에서 활성화되는 하위 모달

---

### 7. Dropdown (드롭다운)
**노드 ID**: `4:2396`, `4:2397`

**Properties**:
- `property1`: 'disabled' | 'default' | 'selected'

**특징**:
- 3가지 상태 제공
- Disabled: 텍스트 색상 변경 (#aeb9c2)
- Default: 테두리 스타일
- Selected: 열린 상태
  - 포커스 테두리: #007bee
  - 드롭다운 메뉴 표시
  - 위쪽 방향 화살표 표시

**구조**:
- 메인 드롭다운 버튼 (36px 높이)
- 드롭다운 메뉴 패널 (최대 5개 옵션 표시)
- 스크롤바 포함
- Inner shadow 효과

**관계**: DropdownElement를 5개 포함

---

### 8. Dropdown Element (드롭다운 요소)
**노드 ID**: `4:2420`

**Properties**:
- `property1`: 'default' | 'hover' | 'click'

**특징**:
- 드롭다운 목록의 개별 아이템
- 3가지 상태 제공
- Hover/Click: rgba(38,198,218,0.1) 배경
- 텍스트 기반 렌더링
- 너비: 104px

**관계**: Dropdown의 하위 구성 요소, 최대 5개까지 표시 가능

---

## 컴포넌트 관계도

```
┌─ Button ──────────────────────────────┐
│  (type, size, state, icon)            │
│  ├─ Primary (blue)                    │
│  ├─ Secondary (light blue)            │
│  ├─ Tertiary (bordered)               │
│  └─ Info (label)                      │
└────────────────────────────────────────┘

┌─ Button Element ──────────────────────┐
│  (date picker component)              │
│  ├─ Used in: DatePicker, DatePickerModal
│  └─ States: select, keep, disable etc │
└────────────────────────────────────────┘

┌─ Button Pagination ───────────────────┐
│  (pagination control)                 │
│  └─ States: default, hover, selected  │
└────────────────────────────────────────┘

┌─ Checkbox ────────────────────────────┐
│  (binary selection)                   │
│  └─ States: select, default, hover    │
└────────────────────────────────────────┘

┌─ Date Picker ────────────────────────┐
│  (date input field)                   │
│  ├─ States: default, hover, disabled  │
│  └─ Opens: DatePickerModal ──────┐    │
│                                   │    │
└───────────────────────────────────┼────┘
                                    │
                    ┌─ Date Picker Modal ┐
                    │ (4 modes):         │
                    │ - date options     │
                    │ - month options    │
                    │ - year options     │
                    │ - consecutive      │
                    └────────────────────┘
                    Uses: Button Element

┌─ Dropdown ───────────────────────────┐
│  (select field)                       │
│  ├─ States: default, disabled, selected
│  └─ Contains: DropdownElement ──────┐ │
│              (5 options max)         │ │
└───────────────────────────────────────┤─┘
                                        │
                    ┌─ Dropdown Element ┐
                    │ States:           │
                    │ - default         │
                    │ - hover           │
                    │ - click           │
                    └────────────────────┘
```

---

## 사용 가이드

### 설치 및 임포트

```typescript
// Button
import Button from '@/components/Button';
<Button type="primary" size="large" state="default" icon={true} />

// ButtonElement  
import ButtonElement from '@/components/ButtonElement';
<ButtonElement property1="select" rectangle={false} icon={false} />

// ButtonPagination
import ButtonPagination from '@/components/ButtonPagination';
<ButtonPagination state="selected" icon={false} />

// Checkbox
import Checkbox from '@/components/Checkbox';
<Checkbox property1="select" />

// DatePicker
import DatePicker from '@/components/DatePicker';
<DatePicker property1="default" />

// DatePickerModal
import DatePickerModal from '@/components/DatePickerModal';
<DatePickerModal property1="date options" />

// Dropdown
import Dropdown from '@/components/Dropdown';
<Dropdown property1="default" />

// DropdownElement
import DropdownElement from '@/components/DropdownElement';
<DropdownElement property1="default" />
```

### 주요 디자인 토큰

**Colors**:
- Primary: #007bee
- Secondary: #84deea
- Danger: #f0312b
- Text Primary: #131416
- Text Disabled: #aeb9c2
- Background: rgba(255,255,255,0.8)

**Typography**:
- Font family: Pretendard (buttons), Spoqa Han Sans Neo (others)
- Element Large: 14px / 20px line-height
- Body Regular: 16px / 1.2 line-height
- Body Large: 20px / 32px line-height

**Spacing**:
- Gap: 2px, 4px, 8px, 12px, 20px
- Padding: 6px, 8px, 12px, 20px
- Border Radius: 4px, 6px, 8px, 1000px (rounded)

**Effects**:
- Blur: 20px (modals), 40px (special)
- Shadow: Drop shadow for modals
- Backdrop: blur-[20px]

---

## 추출 상세 정보

| 컴포넌트 | 노드 ID | 상태 수 | 주요 특징 |
|---------|--------|--------|---------|
| Button | 4:2148 | 12+ | 타입/크기/상태 조합 |
| ButtonElement | 4:2233 | 15 | 날짜 선택 요소 |
| ButtonPagination | 4:825 | 8 | 페이지네이션 |
| Checkbox | 447:3009 | 3 | 체크 상태 |
| DatePicker | 4:799 | 4 | 날짜 입력 필드 |
| DatePickerModal | 4:602 | 4 | 달력/월/년 선택 |
| Dropdown | 4:2396 | 3 | 드롭다운 메뉴 |
| DropdownElement | 4:2420 | 3 | 메뉴 아이템 |

---

## 다음 단계

1. **로컬 컴포넌트 생성**: 생성된 React/TypeScript 코드를 `src/components/` 디렉토리로 복사
2. **스타일 시스템 통합**: Tailwind CSS 클래스를 프로젝트의 CSS 모듈이나 스타일 변수로 변환
3. **테스트**: 각 컴포넌트의 상태와 Props를 테스트
4. **문서화**: Storybook 또는 Component 문서 추가

---

**추출 완료**: 모든 컴포넌트의 노드 ID, 디자인 콘텍스트, React/TypeScript 코드 생성 완료
