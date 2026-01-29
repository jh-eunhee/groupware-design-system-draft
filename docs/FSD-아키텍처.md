# 🚀 Next.js 15 App Router 기반 FSD 아키텍처 가이드



# 요약 시트

#### **FSD의 3계층 구조**
- 1 계층: widgets, features(엔티티 통합), shared
- 2 계층: slice(도메인)
- 3 계층: 세그먼트 (중요도 면에서 가장 낮음)

#### **1. 아키텍처 도입 원칙**

- **유연한 적용:** 모든 개념을 강제로 따를 필요는 없음. 아키텍처는 방법론일 뿐이며, 우리 서비스의 환경, 프로젝트 구조, 인원 구성에 필요한 핵심 개념만 가져다 쓰면 됨.
- **점진적 도입:** FSD 개념은 어려우므로 틀리더라도 점진적으로 도입하는 것이 좋음.
- **일정 최우선:** 일정이 가장 중요하므로, 처음에는 '위젯(Widgets)'에서 빠르게 작업을 진행하고, 이후 여유가 생기면 '공통(Shared)' 분리 -> '기능(Features)' 분리 순으로 진행할 것을 권장함.

#### **2. 주요 개념 및 팁**

- **계층 구조:** 1계층(Widgets, Features), 2계층(Slice/도메인), 3계층(Segments).
- **엔티티 vs 피처:** 가장 헷갈리는 부분임. 쉽게 보면 **엔티티는 '조회'**, **피처는 '생성/수정/삭제'** 느낌으로 구분. (해당 팀은 효율을 위해 이 둘을 통합하기로 결정함)
- **위젯 레이어:** 단순한 조립 레이어로 생각하기 쉽지만, 실제 시작하면 가장 혼란스러운 부분 중 하나임.

#### **3. 세그먼트(Segments) 폴더 구조 (예시: features/domain/)**
좋
- `ui/`: 화면 및 UI 컴포넌트
- `api/`: 서버 통신
- `model/`: 상태 및 비즈니스 로직
- `lib/`: 내부 헬퍼 함수
- `config/`: 환경 구성
- `locales/`: 번역 파일
- `assets/`: 정적 파일
- `providers/`: 프로바이더
- `hooks/`: 내부 훅 (선택)
- `styled/`: 스타일드 컴포넌트 (선택)
- `index.ts`: Public API (외부 노출용)


## 📂 FSD 아키텍처 계층 및 용어 정의 (직관적 가이드)

우리 팀은 폴더 구조를 결정할 때 아래 **3가지 질문**만 기억합니다.

### 1. 계층 (Layer) : "어디에?"
코드가 위치하는 물리적/논리적 높이를 결정합니다.

| 계층 (Layer) | 질문: "어디에?" (설명) | 예시 |
| :--- | :--- | :--- |
| **Shared** | 비즈니스 몰라도 되는 공통 도구함 | Button, Input, DateFormat 유틸 |
| **Entities** | 비즈니스 데이터의 본질 (통계/계산) | 연차 계산 공식, 유저 정보 타입 |
| **Features** | 사용자의 실제 액션 및 기능 단위 | 출근하기 버튼, 결재 승인하기 로직 |
| **Widgets** | 화면을 구성하는 큰 덩어리 조립품 | 근태 현황판 위젯, 결재 문서 목록 섹션 |
| **App** | 실제 주소(URL)가 생기는 페이지 | Next.js Page, Layout |

---

### 2. 슬라이스 (Slice) : "어떤 업무?"
코드가 다루는 도메인 영역을 결정합니다.

| 슬라이스 (Slice) | 질문: "어떤 업무?" (도메인) | 비고 |
| :--- | :--- | :--- |
| **attendance** | 근태 관리 및 연차 관련 업무 | 출퇴근, 지각, 휴가 등 |
| **approval** | 전자결재 및 서명 관련 업무 | 기안, 승인, 반려, 교통비 정산 등 |
| **user** | 인사 정보 및 계정 관련 업무 | 프로필, 가입 신청, 경력 관리 등 |

---

### 3. 세그먼트 (Segment) : "역할이 뭐야?"
폴더 내부에서 파일이 담당하는 기능을 결정합니다.

| 세그먼트 (Segment) | 질문: "역할이 뭐야?" (기능) | 주요 파일 |
| :--- | :--- | :--- |
| **ui** | 화면에 보여지는 요소 | 컴포넌트 (React) |
| **api** | 서버와 통신하는 통로 | **Server Actions (actions.ts)** |
| **model** | 데이터의 모양과 규칙/기억 | Types, Zod Schema, Zustand Store |
| **lib** | 내부에서 쓰는 계산기/도구 | 순수 비즈니스 함수, 헬퍼 함수 |
| **index.ts** | 외부로 나가는 출입문 | Public API Export |

---

### 💡 실무 적용 예시: '교통비 정산(택시)' 리스트 아이템

| 구분 | 답변 | 최종 경로 (예시) |
| :--- | :--- | :--- |
| **계층 (Layer)** | **Features** (결재 액션이 포함되므로) | `src/features/...` |
| **슬라이스 (Slice)** | **approval** (전자결재 업무이므로) | `src/features/approval/...` |
| **세그먼트 (Segment)** | **ui** (눈에 보이는 화면 요소이므로) | `src/features/approval/ui/ApprovalCard.tsx` |






---

# 상세 FSD 구조 관련 개념


우리 프로젝트는 FSD의 엄격함보다는 **실용성**과 **일정**을 최우선으로 합니다. Next.js 15의 최신 기능을 FSD 각 계층에 어떻게 녹여낼지 정의합니다.

> **핵심 철학**: 일정 우선 → 깨끗한 구조. 처음엔 빠르게 만들고, 안정화되면 구조화합니다.

---

## 1️⃣ 계층별 정의 (Next.js 15 최적화)

### Step 1: Widgets & Features 이해하기
- **Widgets**: 페이지의 독립적인 구역. Server Component로서 데이터를 직접 fetch하거나 Features를 조립합니다.
- **Features**: 비즈니스 액션의 단위. **Next.js 15의 Server Actions**가 정의되는 핵심 장소입니다.
  - 초기에는 Entity와 통합하여 조회/CUD를 한 번에 처리합니다.

### Step 2: Shared 컴포넌트 준비하기
- 디자인 시스템(Shadcn)
- 공통 유틸 함수
- 공통 Fetcher(통신 규약)

### Step 3: Slice로 도메인 구분하기
- 도메인 단위로 폴더를 나눕니다. (예: `attendance`, `approval`, `user`)
- 특정 도메인에 종속된 로직은 반드시 해당 슬라이스 내부에서 해결합니다.

---

## 2️⃣ 3계층: 세그먼트(Segments) 완벽 가이드

Next.js 15 App Router로 오면서 3계층의 역할이 기존 리액트 개발 방식과 크게 달라졌습니다. 이 부분을 정확히 인지해야 합니다.

### Step 1: API 세그먼트 설정하기

| 항목 | 설명 | 역할 |
|:---|:---|:---|
| **파일명** | `actions.ts` | API Route 대신 **Server Actions** 정의 |
| **핵심** | `'use server'` 지시문 | 여기서부터 서버 코드가 시작됩니다 |
| **주의사항** | DB 접근, 환경변수 | 반드시 Server Action 내부에서만 |

### Step 2: UI 세그먼트 구성하기

| 항목 | 설명 | 주의점 |
|:---|:---|:---|
| **Server Component** | 기본값 | 데이터 페칭은 여기서 |
| **Client Component** | `'use client'` | UI 인터렉션만 담당 |
| **비즈니스 로직** | 최소화 | 가급적 순수 View 위주 |

### Step 3: Model 세그먼트 구성하기

#### ① **types.ts** - 데이터 타입 정의
```typescript
// features/attendance/model/types.ts
export interface AttendanceRecord {
  id: number;
  userId: number;
  workDate: string; // YYYY-MM-DD
  checkInAt: Date | null;
  checkOutAt: Date | null;
  status: 'NORMAL' | 'LATE' | 'ABSENT' | 'LEAVE';
}
```

#### ② **schema.ts** - 유효성 검사 (Zod)
```typescript
// features/attendance/model/schema.ts
import { z } from 'zod';

export const attendanceUpdateSchema = z.object({
  id: z.number(),
  checkIn: z.string().min(1, "출근 시간은 필수입니다."),
  checkOut: z.string().min(1, "퇴근 시간은 필수입니다."),
  reason: z.string().min(5, "수정 사유는 5자 이상 입력해야 합니다."),
});
```

#### ③ **store.ts** - 클라이언트 상태 (Zustand)
```typescript
// features/attendance/model/store.ts
import { create } from 'zustand';

export const useAttendanceStore = create((set) => ({
  isModalOpen: false,
  selectedDate: null,
  openModal: (date) => set({ isModalOpen: true, selectedDate: date }),
  closeModal: () => set({ isModalOpen: false, selectedDate: null }),
}));
```

### Step 4: Lib 세그먼트 활용하기
- **용도**: 해당 도메인 전용 순수 함수
- **특징**: Server Action 내부에서만 쓰이는 보안 로직, 계산 로직
- **예**: `attendanceValidation.ts`, `leaveCalculator.ts`

### Step 5: Index.ts로 Public API 정의하기
```typescript
// features/attendance/index.ts
export { AttendanceEditForm } from './ui/AttendanceEditForm';
export { updateAttendance } from './api/actions';
export type { AttendanceRecord } from './model/types';
```
- **목적**: 외부 접근을 통제하고 캡슐화를 유지합니다
- **효과**: Widget에서는 `import { AttendanceEditForm } from '@/features/attendance'`만 가능

---

## 3️⃣ 엔티티(Entity) vs 피처(Feature) 통합 전략

초기 효율을 위해 두 개념을 `Features` 레이어에서 통합 관리합니다.

### Step 1: 조회 vs 조작 구분하기

| 작업 | 레이어 | 위치 | 담당 |
|:---|:---|:---|:---|
| **조회** (읽기) | Entity 성격 | `api/` 내 `get*` Server Action | 데이터 페칭 함수 |
| **조작** (쓰기) | Feature 성격 | `api/` 내 `create/update/delete` Server Action | 데이터 변경 함수 |

### Step 2: 왜 통합할까?

**Next.js 15의 이점:**
- 데이터 로딩과 뮤테이션이 하나의 파일(`actions.ts`)에서 관리 → 코드 흐름 파악이 쉬움
- 캐시 갱신(`revalidatePath`)을 한 곳에서 관리 → 버그 감소
- Server Action 그룹핑으로 타입 안정성 향상

### Step 3: 구현 패턴

```typescript
// features/attendance/api/actions.ts
'use server'

// 조회 (Entity성격)
export async function getAttendance(id: number) {
  return db.attendance.findUnique({ where: { id } });
}

// 조작 (Feature성격)
export async function updateAttendance(data: AttendanceUpdateInput) {
  const result = await db.attendance.update({
    where: { id: data.id },
    data: { checkIn: data.checkIn, checkOut: data.checkOut }
  });
  revalidatePath('/attendance');
  return result;
}
```

---

## 4️⃣ 실무 도입 원칙 (Developer Tips)

### ✅ Tip 1: 일정 최우선 (Widgets 중심)

**상황**: 새로운 기능을 만들어야 한다

**❌ 하지 말 것**:
```
폴더 구조를 먼저 정하고 → 파일 만들고 → 코드 작성
(시간 낭비, 마비 상태)
```

**✅ 해야 할 것**:
```
1단계: widgets/[도메인]/ui, api 폴더 안에 다 집어넣기
2단계: 기능 개발 완료하기
3단계: 안정화되고 재사용되면 features/로 추출하기
```

**예시**: 근태 기능이 필요하다면
```
widgets/attendance/
├── ui/
│   ├── AttendanceForm.tsx
│   └── AttendanceList.tsx
└── api/
    └── actions.ts
```
→ 3주 후 다른 페이지에서도 쓰이니까
```
features/attendance/로 옮기기
```

### ✅ Tip 2: Server Action 위치 규칙

**원칙**: 모든 비즈니스 로직은 Server Action 안에만 존재

**체크리스트**:
- [ ] DB 쓰기? → Server Action 내부
- [ ] 외부 API 연동? → Server Action 내부
- [ ] 보안이 필요한 데이터 접근? → Server Action 내부
- [ ] UI 컴포넌트 상단에 로직? → 🚨 이것은 안 됨

**파일 구조**:
```
features/attendance/
├── api/
│   └── actions.ts  ← 모든 로직 여기!
└── ui/
    └── AttendanceForm.tsx  ← 순수 UI 컴포넌트
```

### ✅ Tip 3: 유연한 시작

**필수 세그먼트**:
- `ui/` (UI 컴포넌트)
- `api/` (Server Actions)
- `model/` (Types & Validation)

**선택 세그먼트** (필요할 때 추가):
- `lib/` (도메인 전용 유틸)
- `locales/` (다국어)
- `assets/` (이미지/아이콘)

> **팁**: 처음엔 이 세 개만으로 충분합니다. 나머지는 필요한 시점에 추가하세요.

---

## 5️⃣ 실무 예시: Model 세그먼트 자세히 알기

> **핵심 원칙**: 처음부터 완벽할 필요 없습니다. 필요해질 때 추출하세요.

### Step 1: Model이 필요한 신호

**다음 중 하나라도 해당하면 model/ 폴더를 만들 시점입니다:**
- [ ] 같은 타입을 여러 파일에서 사용
- [ ] 폼 검증 로직이 복잡해짐
- [ ] 다른 피처에서 이 데이터 구조가 필요

### Step 2: Types 정의하기

**규칙**: DB 원본 데이터 + UI에서 쓸 데이터를 명확히 분리

```typescript
// features/attendance/model/types.ts

// 1. DB에서 온 원본 데이터
export interface AttendanceRecord {
  id: number;
  userId: number;
  workDate: string; // YYYY-MM-DD
  checkInAt: Date | null;
  checkOutAt: Date | null;
  status: 'NORMAL' | 'LATE' | 'ABSENT' | 'LEAVE';
}

// 2. 통계 데이터
export interface LeaveStats {
  total: number;
  used: number;
  remaining: number;
}

// 3. 폼 입력 데이터
export interface AttendanceUpdateInput {
  id: number;
  checkIn: string;
  checkOut: string;
  reason: string;
}
```

**장점**:
- Server Component → Client Component로 데이터 전달 시 타입 안정성 보장
- API 응답 구조와 UI 요구 사항이 명확히 분리됨

### Step 3: Validation Schema 작성하기

**도구**: Zod (TypeScript 우선의 스키마 검증 라이브러리)

```typescript
// features/attendance/model/schema.ts
import { z } from 'zod';

// Server Action에서 받을 데이터 검증
export const attendanceUpdateSchema = z.object({
  id: z.number().positive('ID는 양수여야 합니다'),
  checkIn: z.string()
    .min(1, "출근 시간은 필수입니다.")
    .regex(/^\d{2}:\d{2}$/, '시간 형식: HH:MM'),
  checkOut: z.string()
    .min(1, "퇴근 시간은 필수입니다.")
    .regex(/^\d{2}:\d{2}$/, '시간 형식: HH:MM'),
  reason: z.string()
    .min(5, "수정 사유는 5자 이상 입력해야 합니다."),
});

// 사용처: Server Action 내부
export async function updateAttendance(formData: unknown) {
  const validated = attendanceUpdateSchema.parse(formData);
  // 이제 validated는 100% 안전한 데이터입니다
  // ...DB 업데이트 로직
}
```

### Step 4: 클라이언트 상태 관리하기

**도구**: Zustand (경량 상태관리)

```typescript
// features/attendance/model/store.ts
import { create } from 'zustand';
import type { AttendanceRecord } from './types';

interface AttendanceState {
  // 상태
  isModalOpen: boolean;
  selectedRecord: AttendanceRecord | null;
  
  // 액션
  openModal: (record: AttendanceRecord) => void;
  closeModal: () => void;
  updateRecord: (record: AttendanceRecord) => void;
}

export const useAttendanceStore = create<AttendanceState>((set) => ({
  isModalOpen: false,
  selectedRecord: null,
  
  openModal: (record) => set({ 
    isModalOpen: true, 
    selectedRecord: record 
  }),
  
  closeModal: () => set({ 
    isModalOpen: false, 
    selectedRecord: null 
  }),
  
  updateRecord: (record) => set({ selectedRecord: record }),
}));
```

**언제 사용?**
- 여러 UI 컴포넌트가 같은 상태를 공유할 때
- 모달 열기/닫기 같은 UI 상태
- 클라이언트에서만 필요한 데이터

**⚠️ 주의**: DB 데이터는 Server Action에서 관리하세요. Zustand는 UI 상태만!

---

## 6️⃣ 실무 예시: Widgets & Features 조립하기

> **철학**: "페이지는 깡통이고, 위젯이 실질적인 조립품이다"

### Step 1: Widget 만들기

Widget은 Feature들을 조립하여 하나의 완성된 UI 영역을 만듭니다.

```typescript
// src/widgets/attendance-detail-modal/ui/AttendanceDetailWidget.tsx
'use client'

import { AttendanceEditForm } from '@/features/attendance';
import { Card, Modal } from '@/shared/ui'; // 공통 컴포넌트

export function AttendanceDetailWidget({ attendanceId, isOpen, onClose }: any) {
  // 실제로는 여기서 서버 데이터를 fetch하거나 상태를 관리함
  const dummyData = { id: attendanceId, checkIn: '08:51', checkOut: '17:41', reason: '' };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card title="근태 기록 상세">
        {/* Features 계층의 컴포넌트를 조립 */}
        <AttendanceEditForm initialData={dummyData} />
      </Card>
    </Modal>
  );
}
```

### Step 2: 페이지에서 Widgets 배치하기

Next.js 15의 Server Component에서 필요한 데이터를 가져와 Widget에 넘깁니다.

```typescript
// src/app/(dashboard)/attendance/page.tsx
import { AttendanceCalendarWidget } from '@/widgets/attendance-calendar';
import { AttendanceStatsWidget } from '@/widgets/attendance-stats';

export default async function AttendancePage() {
  return (
    <div className="flex gap-6 p-6">
      {/* 1. 통계 위젯 (연차/지각 등 현황) */}
      <aside className="w-1/3">
        <AttendanceStatsWidget />
      </aside>

      {/* 2. 메인 달력 위젯 */}
      <section className="flex-1">
        <AttendanceCalendarWidget />
      </section>
    </div>
  );
}
```

### Step 3: 이점 활용하기

이렇게 짜두면 나중에 다음과 같은 상황에서 빛을 발합니다:

| 상황 | 해결 방법 |
|:---|:---|
| "근태 수정 폼"이 마이페이지에도 필요 | `AttendanceEditForm` 컴포넌트만 재사용 |
| 결재 시스템 수정 필요 | 근태 시스템 코드는 영향 없음 (도메인 독립성) |
| 코드 이해가 필요 | app/ → widgets/ → features/ 계층 단위로 파악 |

---

## 7️⃣ 고급: 비즈니스 로직 파편화 해결

프로젝트 초기엔 일정을 고려해 `features/attendance`에 몰아넣지만, 연차 데이터가 여러 곳에서 쓰이기 시작하면 구조적 결단이 필요합니다.

### Step 1: 언제 Entities를 분리할까?

**신호**:
- 같은 로직이 2개 이상의 Features에서 재사용됨
- "연차 계산" 같은 핵심 비즈니스 규칙이 자주 변함
- 여러 도메인(근태, 급여, 인사)에서 공통 데이터를 쓰임

### Step 2: Entities vs Features 역할 분리

| 레이어 | 담당 | 예시 |
|:---|:---|:---|
| **Entities** | 데이터의 **본질**과 **공통 계산** | "연차는 [총량 - 사용량]이다" |
| **Features** | 특정 **비즈니스 액션** | "연차를 신청한다", "연차를 승인한다" |

### Step 3: 구조 변경하기

```plaintext
src/
├── entities/                # [NEW] 도메인의 '본질'만 모음
│   └── leave/               
│       ├── lib/
│       │   └── calculateRemainingLeave.ts  # 여기저기서 쓰는 순수 로직
│       ├── api/
│       │   └── actions.ts                  # getLeaveBalance
│       └── model/
│           └── types.ts                    # LeaveInfo Interface
│
├── features/                # [동작] Entities의 로직을 가져다 씀
│   ├── attendance-control/  # 출퇴근 버튼 + 연차 확인 (entities/leave 활용)
│   ├── payroll-calculator/  # 급여계산 시 연차 수당 (entities/leave 활용)
│   └── leave-application/   # 연차 기안서 (entities/leave 활용)
│
└── shared/                  # 순수 유틸리티
    └── lib/                 # date-formatter, number-utils
```

### Step 4: 로직 분류 기준

**이 기준 하나로 결정하세요:**

| 로직 | 위치 | 이유 |
|:---|:---|:---|
| 비즈니스 규칙 (연차는 1년 이상 근무 필요) | `entities/` | 여러 feature가 공유 |
| 특정 액션 (신청 버튼 클릭) | `features/` | 하나의 feature만 담당 |
| 순수 도구 (날짜 포맷팅) | `shared/lib/` | 비즈니스 색깔 없음 |

### Step 5: 크로스-Feature 로직 처리

**규칙**: Feature가 Feature를 직접 참조하지 않기

**❌ 안 됨**:
```typescript
// features/attendance/api/actions.ts에서
import { updateApprovalStatus } from '@/features/approval';
```

**✅ 해야 할 것**:
1. Entities 레이어로 추출하거나
2. Widgets/App 레이어에서 조합하거나
3. `shared/api/services`에 공통 함수 배치

---

## 📋 최종 체크리스트

새 기능을 만들 때 이 순서를 따르세요:

- [ ] **Step 1**: 일단 `widgets/[domain]/` 안에 만들기
- [ ] **Step 2**: UI와 Server Action 분리하기
- [ ] **Step 3**: 타입이 복잡해지면 `model/types.ts` 추출
- [ ] **Step 4**: 검증이 필요하면 `model/schema.ts` 추출
- [ ] **Step 5**: 재사용되기 시작하면 `features/`로 옮기기
- [ ] **Step 6**: 여러 feature가 공유하면 `entities/`로 추출

---

## 💡 정리

**초기 효율을 위한 전략:**
```
widgets/[domain]/ 
  ↓ (안정화되면)
features/[domain]/
  ↓ (다른 곳에서도 쓰이면)
entities/[domain]/
```

이렇게 하면 **일정도 맞추고, 나중에 깔끔한 구조도 만들 수 있습니다.**
