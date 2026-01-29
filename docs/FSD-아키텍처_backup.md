# 🚀 Next.js 15 App Router 기반 FSD 아키텍처 가이드

우리 프로젝트는 FSD의 엄격함보다는 **실용성**과 **일정**을 최우선으로 합니다. Next.js 15의 최신 기능을 FSD 각 계층에 어떻게 녹여낼지 정의합니다.

---

## 1. 계층별 정의 (Next.js 15 최적화)

### **[1계층] Widgets & Features (엔티티 통합)**
- **Widgets**: 페이지의 독립적인 구역. Server Component로서 데이터를 직접 fetch하거나 Features를 조립합니다.
- **Features**: 비즈니스 액션의 단위. **Next.js 15의 Server Actions**가 정의되는 핵심 장소입니다. 
  *(지인 조언 반영: 초기에는 Entity와 통합하여 조회/CUD를 한 번에 처리합니다.)*
- **Shared**: 디자인 시스템(Shadcn), 공통 유틸, 공통 Fetcher(통신 규약).

### **[2계층] Slice (도메인)**
- 도메인 단위로 폴더를 나눕니다. (예: `attendance`, `approval`, `user`)
- 특정 도메인에 종속된 로직은 반드시 해당 슬라이스 내부에서 해결합니다.

---

## 2. [집중] 3계층: 세그먼트(Segments)의 변화

Next.js 15 App Router로 오면서 3계층의 역할이 기존 리액트 개발 방식과 크게 달라졌습니다. 이 부분을 정확히 인지해야 합니다.

| 세그먼트 | Next.js 15에서의 역할 및 변화 | 중요도 |
| :--- | :--- | :--- |
| **`api/`** | **[핵심]** API Route 대신 **Server Actions**(`actions.ts`)를 정의합니다. `'use server'`가 시작되는 곳입니다. | 상 |
| **`ui/`** | Server Component와 Client Component(`'use client'`)가 공존합니다. 가급적 비즈니스 로직이 없는 순수 View 위주로 작성합니다. | 상 |
| **`model/`** | **[변화]** 클라이언트 상태(Zustand)뿐만 아니라, 서버에서 넘어오는 데이터의 **Type 정의**와 **Validation Schema**(Zod 등)를 포함합니다. | 중 |
| **`lib/`** | 해당 도메인 전용 순수 함수. 특히 **Server Action 내부에서만 쓰이는 보안 로직**이나 계산 로직을 둡니다. | 중 |
| **`index.ts`** | 해당 슬라이스의 **Public API**. 외부(Widget/Page)에 노출할 컴포넌트와 액션만 정의하여 캡슐화를 유지합니다. | 필수 |

---

## 3. 엔티티(Entity) vs 피처(Feature) 통합 전략

우리는 효율을 위해 두 개념을 `Features` 레이어에서 통합 관리합니다.

- **조회(Entity 성격)**: `api/` 내의 `get` 계열 Server Action 또는 Data Fetching 함수.
- **조작(Feature 성격)**: `api/` 내의 `create/update/delete` 계열 Server Action.
- **통합 이유**: Next.js 15에서는 데이터 로딩(조회)과 뮤테이션(조작)이 하나의 파일(`actions.ts`)에서 관리되는 것이 코드 흐름 파악과 캐시 갱신(`revalidatePath`) 측면에서 훨씬 유리하기 때문입니다.

---

## 4. 실무 도입 원칙 (Developer Tips)

### **✅ 1. 일정 최우선 (Widgets 중심)**
- 새로운 기능을 만들 때, 폴더 구조 고민으로 시간을 쓰지 마세요. 
- 일단 `widgets/[도메인]/` 폴더 안에 `ui`, `api` 등을 다 집어넣고 한 번에 개발합니다.
- 기능이 안정화되고 다른 곳에서도 쓰일 때 `features/`로 추출해도 늦지 않습니다.

### **✅ 2. Server Action 위치**
- 모든 비즈니스 로직(DB 쓰기, 외부 API 연동)은 `features/[domain]/api/actions.ts`에 위치시키는 것을 권장합니다.
- UI 컴포넌트 내부에 직접 로직을 짜지 마세요.

### **✅ 3. 유연한 적용**
- 모든 세그먼트(`locales`, `assets` 등)를 처음부터 만들 필요 없습니다. 
- `ui`, `api`, `model` 3가지만 있어도 개발은 충분히 가능합니다. 필요할 때 늘려가세요.

---









## 5. 각 용도별 예시

### **✅ 1. model의 예시**

처음부터 이 파일들을 다 만들필요는 없습니다. 초기엔 ui/ 컴포넌트 상단에 타입을 대충 적어두고 개발하다가, "어? 이 타입을 다른 위젯에서도 쓰네?" 혹은 "폼 검증 로직이 복잡해지네?" 싶을 때 model/ 폴더를 만들어 추출하는 것이 가장 일정을 잘 지키는 방법입니다.

1. model/ 세그먼트에 들어가는 3가지 핵심 요소
① 데이터 타입 정의 (types.ts)
DB에서 넘어오는 원본 데이터와 UI에서 사용할 데이터의 형태를 정의합니다.

Next.js 15 특징: 서버 컴포넌트에서 클라이언트 컴포넌트로 데이터를 넘길 때 타입 안정성을 보장합니다.

TypeScript
// features/attendance/model/types.ts
export interface AttendanceRecord {
  id: number;
  userId: number;
  workDate: string; // YYYY-MM-DD
  checkInAt: Date | null;
  checkOutAt: Date | null;
  status: 'NORMAL' | 'LATE' | 'ABSENT' | 'LEAVE';
}

export interface LeaveStats {
  total: number;
  used: number;
  remaining: number;
}
② 유효성 검사 스키마 (schema.ts)
Next.js 15의 Server Actions에서 폼 데이터를 검증할 때 사용합니다. 주로 Zod 라이브러리를 많이 사용합니다.

중요도: '수정 사유 필수'와 같은 비즈니스 규칙이 여기서 관리됩니다.

```TypeScript
// features/attendance/model/schema.ts
import { z } from 'zod';

export const attendanceUpdateSchema = z.object({
  id: z.number(),
  checkIn: z.string().min(1, "출근 시간은 필수입니다."),
  checkOut: z.string().min(1, "퇴근 시간은 필수입니다."),
  reason: z.string().min(5, "수정 사유는 5자 이상 입력해야 합니다."),
});
```

③ 상태 관리 (store.ts 또는 use-hooks)
클라이언트 사이드에서 실시간 계산이 필요하거나 여러 컴포넌트가 공유해야 하는 상태를 관리합니다 (Zustand 등 활용).

```TypeScript
// features/attendance/model/store.ts (Zustand 예시)
import { create } from 'zustand';

interface AttendanceState {
  isModalOpen: boolean;
  selectedDate: string | null;
  actions: {
    openModal: (date: string) => void;
    closeModal: () => void;
  };
}
export const useAttendanceStore = create<AttendanceState>((set) => ({
  isModalOpen: false,
  selectedDate: null,
  actions: {
    openModal: (date) => set({ isModalOpen: true, selectedDate: date }),
    closeModal: () => set({ isModalOpen: false, selectedDate: null }),
  },
}));
```

2. Next.js 15에서 model/이 중요한 이유
과거에는 model/이 단순히 "상태 저장소"였다면, 지금은 서버와 클라이언트를 연결하는 규격입니다.

**서버(api/actions.ts)**는 model/schema.ts를 가져와서 데이터가 올바른지 검사합니다.

**클라이언트(ui/Form.tsx)**는 model/types.ts를 가져와서 화면에 어떤 값을 뿌릴지 결정합니다.

**비즈니스 로직(lib/utils.ts)**은 model/types.ts의 인터페이스를 바탕으로 연산을 수행합니다.





### **✅ 2. **페이지 레이어(app)**에서 우리가 만든 **기능(features)**들을 어떻게 **위젯(widgets)**으로 조립하고 화면에 배치하는지 예시**


**"페이지는 깡통이고, 위젯이 실질적인 조립품이다"**라는 철학을 담았습니다.

1. [Widgets] 근태 상세 위젯 (AttendanceDetailWidget.tsx)
단순히 폼만 있는 게 아니라, 공유해주신 이미지처럼 팝업(Modal) 처리나 부가적인 정보를 포함하는 조립 레이어입니다.

TypeScript
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
2. [App] 실제 페이지 배치 (app/attendance/page.tsx)
Next.js 15의 서버 컴포넌트에서 필요한 데이터를 가져와 위젯에 넘겨줍니다.

TypeScript
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

      {/* 2. 메인 달력 위젯 (image_5cd8eb.png 화면) */}
      <section className="flex-1">
        <AttendanceCalendarWidget />
      </section>
    </div>
  );
}
🚀 FSD 구조 적용의 최종 이점
이렇게 짜두면 나중에 다음과 같은 상황에서 빛을 발합니다.

재사용성: "근태 수정 폼"이 마이페이지에도 필요하다면? 그냥 AttendanceEditForm만 가져다 쓰면 됩니다.

독립성: 결재(Approval) 시스템 코드를 수정해도 근태(Attendance) 시스템 코드는 영향을 받지 않습니다.

가독성: app/ 폴더를 열면 이 페이지에 어떤 큰 덩어리(Widgets)들이 있는지 한눈에 보이고, 세부 로직을 보고 싶으면 해당 features/ 폴더로 들어가면 됩니다.