# FSD 구현 가이드: 근태관리 예제 (실전 코드)

> 이 가이드는 FSD 아키텍처를 **실제로 구현하는 방법**을 보여줍니다.
> 추상적인 설명이 아닌 **바로 복사-붙여넣기할 수 있는 코드**로 구성됩니다.

---

## 0️⃣ 전체 폴더 구조

```plaintext
src/
├── entities/
│   └── attendance/               ✅ 비즈니스 규칙 (변하지 않는 핵심 로직)
│       ├── model/
│       │   └── types.ts         # 데이터 구조
│       ├── lib/
│       │   └── attendance-calculator.ts  # 순수 함수 (근무시간 계산, 지각 판별)
│       └── index.ts             # Public API
│
├── features/
│   └── attendance/              ✅ 비즈니스 동작 (사용자 액션)
│       ├── api/
│       │   └── actions.ts      # Server Actions (출근 등록, 조회)
│       ├── ui/
│       │   └── CheckInButton.tsx  # UI 컴포넌트
│       ├── model/
│       │   └── index.ts        # Types, Schemas
│       └── index.ts            # Public API
│
├── widgets/
│   └── attendance-status/       ✅ UI 조립 (features + entities + shared)
│       ├── ui/
│       │   └── AttendanceStatusWidget.tsx
│       └── index.ts
│
├── shared/
│   ├── ui/                      ✅ 공통 컴포넌트 (Button, Card, Badge)
│   └── api/
│       └── db.ts               # DB 클라이언트
│
└── app/
    └── (dashboard)/
        └── page.tsx            ✅ 실제 페이지
```

---

## 1️⃣ Entities: 비즈니스 규칙 정의

### 📄 entities/attendance/model/types.ts

```typescript
/**
 * 근태 엔티티의 데이터 구조
 * 이 파일은 entities 계층의 중심입니다.
 * features와 widgets에서 이 타입을 참고합니다.
 */

/** 근태 상태 (확장 가능하게 설계) */
export type AttendanceStatus = 'NORMAL' | 'LATE' | 'ABSENT' | 'OUTSIDE';

/** 근태 기록의 핵심 데이터 */
export interface Attendance {
  id: number;
  userId: number;
  workDate: string;           // YYYY-MM-DD
  checkInAt: Date | null;     // 출근 시각
  checkOutAt: Date | null;    // 퇴근 시각
  status: AttendanceStatus;   // 상태 (지각, 정상 등)
  remark?: string;            // 비고 (예: 출장)
}

/** 주간/월간 통계 */
export interface AttendanceStats {
  totalWorkMinutes: number;   // 총 근무시간 (분)
  overtimeMinutes: number;    // 초과근무 (분)
  lateCount: number;          // 지각 횟수
  absentCount: number;        // 결근 횟수
}

/** 일일 통계 */
export interface DailyAttendanceSummary {
  workDate: string;
  status: AttendanceStatus;
  netWorkMinutes: number;     // 실 근무 시간
  isOvertime: boolean;        // 초과근무 여부
}
```

### 📄 entities/attendance/lib/attendance-calculator.ts

```typescript
/**
 * 근태 관련 모든 계산 로직을 여기에 집중
 * 
 * 중요: 이 함수들은 순수 함수(Pure Function)입니다.
 * - DB나 API에 의존하지 않음
 * - 같은 입력에 항상 같은 출력
 * - 어디서든 재사용 가능 (Server/Client 모두)
 * 
 * 비즈니스 정책이 바뀌면 이 파일만 수정합니다.
 */

/**
 * 출퇴근 시각으로부터 실제 근무 시간(분)을 계산
 * 
 * 규칙:
 * - 점심시간 1시간 자동 차감
 * - 8시간 이상이면 초과근무 판단 기준
 * 
 * @param checkIn 출근 시각
 * @param checkOut 퇴근 시각
 * @returns 실 근무 시간 (분)
 */
export const calculateNetWorkMinutes = (
  checkIn: Date,
  checkOut: Date
): number => {
  const diffMs = checkOut.getTime() - checkIn.getTime();
  const diffMin = Math.floor(diffMs / (1000 * 60));

  const LUNCH_BREAK = 60; // 점심시간 60분 고정
  return diffMin > LUNCH_BREAK ? diffMin - LUNCH_BREAK : 0;
};

/**
 * 지각 여부를 판단
 * 
 * 규칙: 09:00을 기준으로 이후이면 지각
 * 
 * @param checkInTime HH:mm 형식의 시간 (예: "09:15")
 * @param limitTime 기준 시간 (기본: "09:00")
 * @returns 지각 여부
 */
export const isLate = (
  checkInTime: string,
  limitTime: string = "09:00"
): boolean => {
  return checkInTime > limitTime;
};

/**
 * 초과근무 여부 판단
 * 
 * 규칙: 8시간(480분) 이상 근무하면 초과근무
 * 
 * @param netWorkMinutes 실 근무 시간 (분)
 * @returns 초과근무 여부
 */
export const isOvertime = (netWorkMinutes: number): boolean => {
  const STANDARD_WORK_MINUTES = 480; // 8시간
  return netWorkMinutes > STANDARD_WORK_MINUTES;
};

/**
 * 시간(분)을 "HH:mm" 형식으로 변환
 * 
 * @param minutes 분 단위
 * @returns "08:30" 형식의 문자열
 */
export const formatMinutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

/**
 * 출근/퇴근 상태를 한국어로 표현
 * UI에서 사용
 */
export const getAttendanceLabel = (status: string): string => {
  const labels: Record<string, string> = {
    NORMAL: '정상 출근',
    LATE: '지각',
    ABSENT: '결근',
    OUTSIDE: '외출',
  };
  return labels[status] ?? '알 수 없음';
};
```

### 📄 entities/attendance/index.ts

```typescript
/**
 * Entities 계층의 Public API
 * 외부에서는 여기서만 import합니다.
 * 
 * export { calculateNetWorkMinutes } from '@/entities/attendance'
 */

export type {
  Attendance,
  AttendanceStatus,
  AttendanceStats,
  DailyAttendanceSummary,
} from './model/types';

export {
  calculateNetWorkMinutes,
  isLate,
  isOvertime,
  formatMinutesToTime,
  getAttendanceLabel,
} from './lib/attendance-calculator';
```

---

## 2️⃣ Features: 비즈니스 동작 구현

### 📄 features/attendance/api/actions.ts

```typescript
/**
 * Features 계층: 실제 "비즈니스 액션"
 * 
 * 특징:
 * - 'use server' 지시문으로 시작 (Next.js 15)
 * - Entities의 규칙을 가져와서 활용
 * - DB에 데이터를 저장/수정
 * - 캐시 갱신 (revalidatePath)
 * 
 * 사용처: features/attendance/ui 컴포넌트에서 호출
 */

'use server'

import { revalidatePath } from 'next/cache';
import {
  isLate,
  isOvertime,
  calculateNetWorkMinutes,
} from '@/entities/attendance';
import { db } from '@/shared/api/db';

/**
 * ✅ Step 1: 출근 등록
 * 
 * 흐름:
 * 1. 사용자가 UI의 "출근하기" 버튼 클릭
 * 2. 이 함수가 서버에서 실행됨
 * 3. 현재 시간으로 entities의 규칙 적용 (지각 판별)
 * 4. DB에 저장
 * 5. 화면 캐시 갱신
 */
export async function recordCheckIn(userId: number) {
  // 1. 현재 시간 기준으로 출근 기록 생성
  const now = new Date();
  const checkInTimeStr = now.getHours().toString().padStart(2, '0') + ':' +
                         now.getMinutes().toString().padStart(2, '0');

  // 2. Entities의 규칙으로 "지각 여부" 판단
  const status = isLate(checkInTimeStr) ? 'LATE' : 'NORMAL';

  // 3. DB에 저장
  const attendance = await db.attendance.create({
    data: {
      userId,
      workDate: now.toISOString().split('T')[0],
      checkInAt: now,
      status,
    },
  });

  // 4. Next.js 캐시 갱신 (화면이 자동으로 업데이트됨)
  revalidatePath('/dashboard');

  return {
    success: true,
    status,
    checkInTime: checkInTimeStr,
    message: status === 'LATE' ? '⚠️ 지각 처리되었습니다.' : '✅ 정상 출근되었습니다.',
  };
}

/**
 * ✅ Step 2: 퇴근 등록
 * 
 * recordCheckIn과 동일한 패턴이지만 checkOutAt을 갱신
 */
export async function recordCheckOut(userId: number) {
  const now = new Date();
  const workDate = now.toISOString().split('T')[0];

  // 1. 오늘의 출근 기록 찾기
  const attendance = await db.attendance.findFirst({
    where: {
      userId,
      workDate,
    },
  });

  if (!attendance) {
    return {
      success: false,
      message: '❌ 출근 기록이 없습니다.',
    };
  }

  // 2. 퇴근 시각 저장
  const updated = await db.attendance.update({
    where: { id: attendance.id },
    data: {
      checkOutAt: now,
    },
  });

  // 3. 실제 근무 시간 계산
  if (updated.checkInAt && updated.checkOutAt) {
    const netMinutes = calculateNetWorkMinutes(
      updated.checkInAt,
      updated.checkOutAt
    );
    const isOT = isOvertime(netMinutes);

    // 근무 시간을 기반으로 추가 처리 가능
    console.log(`근무시간: ${netMinutes}분, 초과근무: ${isOT}`);
  }

  revalidatePath('/dashboard');

  return {
    success: true,
    message: '✅ 퇴근이 등록되었습니다.',
  };
}

/**
 * ✅ Step 3: 오늘의 근태 조회
 * 
 * 위젯이나 대시보드에서 현재 상태를 가져올 때 사용
 */
export async function getTodayAttendance(userId: number) {
  const today = new Date().toISOString().split('T')[0];

  const attendance = await db.attendance.findFirst({
    where: {
      userId,
      workDate: today,
    },
  });

  return attendance ?? null;
}

/**
 * ✅ Step 4: 주간 근태 통계 조회
 * 
 * 대시보드의 통계 위젯에서 사용
 */
export async function getWeeklyAttendanceStats(userId: number) {
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const records = await db.attendance.findMany({
    where: {
      userId,
      workDate: {
        gte: sevenDaysAgo.toISOString().split('T')[0],
        lte: today.toISOString().split('T')[0],
      },
    },
    orderBy: {
      workDate: 'desc',
    },
  });

  // 통계 계산
  let lateCount = 0;
  let totalNetMinutes = 0;

  for (const record of records) {
    if (record.status === 'LATE') lateCount++;

    if (record.checkInAt && record.checkOutAt) {
      const netMinutes = calculateNetWorkMinutes(
        record.checkInAt,
        record.checkOutAt
      );
      totalNetMinutes += netMinutes;
    }
  }

  return {
    totalDays: records.length,
    lateCount,
    totalNetMinutes,
    averageMinutesPerDay:
      records.length > 0 ? Math.floor(totalNetMinutes / records.length) : 0,
  };
}
```

### 📄 features/attendance/ui/CheckInButton.tsx

```typescript
/**
 * Features 계층: UI 컴포넌트
 * 
 * 특징:
 * - 'use client' (클라이언트 컴포넌트)
 * - Server Action (recordCheckIn)을 호출
 * - 비즈니스 로직 없음 (순수 UI만 담당)
 * - Entities의 타입을 props로 받음
 */

'use client'

import { useState } from 'react';
import { recordCheckIn, recordCheckOut } from '../api/actions';
import type { Attendance } from '@/entities/attendance';

interface CheckInButtonProps {
  userId: number;
  attendance: Attendance | null;
}

export function CheckInButton({ userId, attendance }: CheckInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleCheckIn = async () => {
    setIsLoading(true);
    try {
      const result = await recordCheckIn(userId);
      setMessage(result.message);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setIsLoading(true);
    try {
      const result = await recordCheckOut(userId);
      setMessage(result.message);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 아직 출근 안 함 → 출근 버튼
  if (!attendance) {
    return (
      <div>
        <button
          onClick={handleCheckIn}
          disabled={isLoading}
          className="w-full py-6 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-bold text-lg transition"
        >
          {isLoading ? '처리 중...' : '출근하기'}
        </button>
        {message && <p className="mt-2 text-sm text-center">{message}</p>}
      </div>
    );
  }

  // 출근했지만 퇴근 안 함 → 퇴근 버튼
  if (!attendance.checkOutAt) {
    return (
      <div>
        <button
          onClick={handleCheckOut}
          disabled={isLoading}
          className="w-full py-6 px-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg font-bold text-lg transition"
        >
          {isLoading ? '처리 중...' : '퇴근하기'}
        </button>
        {message && <p className="mt-2 text-sm text-center">{message}</p>}
      </div>
    );
  }

  // 이미 출퇴근 완료
  return (
    <div className="p-4 bg-green-100 rounded-lg text-green-800">
      ✅ 오늘 출퇴근이 완료되었습니다.
    </div>
  );
}
```

### 📄 features/attendance/index.ts

```typescript
/**
 * Features 계층의 Public API
 * 
 * 외부에서는 여기서만 import합니다:
 * 
 * import { CheckInButton } from '@/features/attendance'
 * import { recordCheckIn } from '@/features/attendance'
 */

export { CheckInButton } from './ui/CheckInButton';

export {
  recordCheckIn,
  recordCheckOut,
  getTodayAttendance,
  getWeeklyAttendanceStats,
} from './api/actions';
```

---

## 3️⃣ Widgets: UI 조립

### 📄 widgets/attendance-status/ui/AttendanceStatusWidget.tsx

```typescript
/**
 * Widgets 계층: Features + Shared 컴포넌트 조립
 * 
 * 역할:
 * - Features의 컴포넌트를 가져옴
 * - Shared의 UI 컴포넌트(Card, Badge)와 함께 조립
 * - Entities의 타입과 유틸 함수 활용
 * - Server Component (async 가능)
 * 
 * 결과: 하나의 완성된 UI 영역
 */

import { getTodayAttendance, CheckInButton } from '@/features/attendance';
import {
  formatMinutesToTime,
  getAttendanceLabel,
  calculateNetWorkMinutes,
} from '@/entities/attendance';
import { Card, Badge } from '@/shared/ui';

interface AttendanceStatusWidgetProps {
  userId: number;
}

export async function AttendanceStatusWidget({
  userId,
}: AttendanceStatusWidgetProps) {
  // 1. 서버에서 오늘의 근태 데이터 가져오기
  const attendance = await getTodayAttendance(userId);

  // 2. 근무 시간 계산 (출퇴근 완료한 경우)
  let netWorkMinutesStr = '--:--';
  if (attendance?.checkInAt && attendance?.checkOutAt) {
    const netMinutes = calculateNetWorkMinutes(
      attendance.checkInAt,
      attendance.checkOutAt
    );
    netWorkMinutesStr = formatMinutesToTime(netMinutes);
  }

  // 3. UI 조립
  return (
    <Card className="p-6 shadow-md rounded-lg border border-gray-200">
      {/* 헤더: 제목 + 상태 배지 */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">오늘의 근태</h2>
        {attendance ? (
          <Badge
            variant={attendance.status === 'LATE' ? 'destructive' : 'default'}
          >
            {getAttendanceLabel(attendance.status)}
          </Badge>
        ) : (
          <Badge variant="outline">미출근</Badge>
        )}
      </div>

      {/* 신체: 시간 정보 */}
      <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">출근 시간</span>
          <span className="font-semibold text-gray-800">
            {attendance?.checkInAt
              ? new Date(attendance.checkInAt).toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : '--:--'}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">퇴근 시간</span>
          <span className="font-semibold text-gray-800">
            {attendance?.checkOutAt
              ? new Date(attendance.checkOutAt).toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : '--:--'}
          </span>
        </div>

        <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
          <span className="text-gray-600">실 근무 시간</span>
          <span className="font-bold text-blue-600">{netWorkMinutesStr}</span>
        </div>
      </div>

      {/* 액션: Features의 CheckInButton 배치 */}
      <CheckInButton userId={userId} attendance={attendance} />
    </Card>
  );
}
```

### 📄 widgets/attendance-status/index.ts

```typescript
/**
 * Widget 계층의 Public API
 */

export { AttendanceStatusWidget } from './ui/AttendanceStatusWidget';
```

---

## 4️⃣ App: 최종 페이지 배치

### 📄 app/(dashboard)/page.tsx

```typescript
/**
 * App 레이어: 실제 페이지
 * 
 * 역할:
 * - Widgets를 배치
 * - 레이아웃 구성
 * - URL 라우팅과 매핑
 * 
 * 중요:
 * - 비즈니스 로직 없음
 * - Widgets 조립만 함
 * - 깔끔한 구조로 한눈에 이해 가능
 */

import { AttendanceStatusWidget } from '@/widgets/attendance-status';

export default function DashboardPage() {
  // 실제로는 세션/쿠키에서 가져옴
  const currentUserId = 123;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 상단 헤더 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
          <p className="text-gray-600 mt-2">홍길동님, 오늘도 화이팅! 💪</p>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. 근태 위젯 (큰 영역) */}
          <div className="md:col-span-2">
            <AttendanceStatusWidget userId={currentUserId} />
          </div>

          {/* 2. 사이드바: 빠른 정보 */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-gray-800 mb-4">이번 주 통계</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>지각</span>
                  <span className="font-bold">1회</span>
                </div>
                <div className="flex justify-between">
                  <span>결근</span>
                  <span className="font-bold">0회</span>
                </div>
                <div className="flex justify-between">
                  <span>평균 근무</span>
                  <span className="font-bold">08:30</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-gray-800 mb-4">연차</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>총 연차</span>
                  <span className="font-bold">15일</span>
                </div>
                <div className="flex justify-between">
                  <span>사용</span>
                  <span className="font-bold">3일</span>
                </div>
                <div className="flex justify-between">
                  <span>잔여</span>
                  <span className="font-bold text-blue-600">12일</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
```

---

## 5️⃣ 공유 라이브러리 (Shared)

### 📄 shared/ui/Card.tsx

```typescript
/**
 * 공통 컴포넌트: Card
 */

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-100 ${className}`}>
      {children}
    </div>
  );
}
```

### 📄 shared/ui/Badge.tsx

```typescript
/**
 * 공통 컴포넌트: Badge
 */

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-blue-100 text-blue-800',
    destructive: 'bg-red-100 text-red-800',
    outline: 'border border-gray-300 text-gray-700',
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
```

### 📄 shared/ui/index.ts

```typescript
export { Card } from './Card';
export { Badge } from './Badge';
```

### 📄 shared/api/db.ts

```typescript
/**
 * DB 클라이언트 (Prisma 예시)
 */

import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();
```

---

## 🔄 실행 흐름 (시뮬레이션)

### 사용자가 "출근하기" 버튼을 클릭했을 때

```
1️⃣ app/page.tsx (App)
   ↓ AttendanceStatusWidget을 배치

2️⃣ widgets/attendance-status/ui/AttendanceStatusWidget.tsx (Widget)
   ↓ getTodayAttendance()로 서버에서 데이터 가져옴
   ↓ <CheckInButton /> 컴포넌트 렌더링

3️⃣ features/attendance/ui/CheckInButton.tsx (Feature - UI)
   ↓ "출근하기" 버튼 클릭
   ↓ recordCheckIn(userId) 호출 (Server Action)

4️⃣ features/attendance/api/actions.ts (Feature - API)
   ↓ isLate() 함수 호출 (Entities의 규칙)

5️⃣ entities/attendance/lib/attendance-calculator.ts (Entities)
   ↓ 현재 시간이 09:00 이후인지 판단
   ↓ 지각 여부 반환 ('LATE' or 'NORMAL')

6️⃣ features/attendance/api/actions.ts (계속)
   ↓ DB에 저장
   ↓ revalidatePath('/dashboard') 캐시 갱신

7️⃣ 화면 자동 업데이트
   ✅ 사용자 화면에 "정상 출근" 또는 "지각" 메시지 표시
```

---

## 💡 핵심 이점

| 상황 | 해결 |
|:---|:---|
| "09시 기준 지각"을 "10시 기준"으로 변경 | `entities/attendance/lib`의 `isLate()` 함수만 수정 |
| 모바일 앱 추가 필요 | `features/` 와 `entities/` 재사용, UI만 새로 작성 |
| 급여 계산 시스템이 근무시간 필요 | `entities/attendance/lib` 의 `calculateNetWorkMinutes()` 가져다 쓰기 |
| 버그 찾기 | app → widgets → features → entities 순서로 추적 |
| 새로운 사람 온보딩 | "app을 보면 전체 구조, features를 보면 비즈니스, entities를 보면 규칙" |

---

## 📋 다음 단계: 전자결재(Approval) 시스템

이 동일한 패턴으로 다음을 만들 수 있습니다:

```plaintext
✅ entities/approval/
   - approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED'
   - calculateApprovalTime() 등

✅ features/approval/
   - submitApproval()
   - approveDocument()
   - ApprovalForm.tsx

✅ widgets/approval-list/
   - 결재 목록 조립

✅ app/(dashboard)/approval/page.tsx
   - 결재 페이지 배치
```

---

## 🆚 기술 중심 구조 vs FSD (도메인 중심 구조)

> **가장 큰 차이**: "코드를 찾으러 갈 때의 지도(Map)가 무엇인가"

### 1️⃣ 기존 방식: 기술 중심 구조 (Technical Grouping)

**폴더 구조**:
```plaintext
src/
├── components/              # 모든 컴포넌트
│   ├── CheckInButton.tsx
│   ├── AttendanceForm.tsx
│   ├── ApprovalForm.tsx
│   ├── LeaveRequestForm.tsx
│   └── UserProfile.tsx
│
├── hooks/                   # 모든 커스텀 훅
│   ├── useAttendance.ts
│   ├── useApproval.ts
│   ├── useForm.ts
│   └── useAsync.ts
│
├── api/                     # 모든 API 호출
│   ├── attendance.ts
│   ├── approval.ts
│   ├── user.ts
│   └── axios-instance.ts
│
├── types/                   # 모든 타입 정의
│   ├── attendance.ts
│   ├── approval.ts
│   ├── user.ts
│   └── common.ts
│
├── utils/                   # 모든 유틸리티
│   ├── dateFormatter.ts
│   ├── validators.ts
│   ├── calculations.ts
│   └── storage.ts
│
├── store/                   # 모든 상태 관리
│   ├── attendanceStore.ts
│   ├── approvalStore.ts
│   └── userStore.ts
│
└── styles/
    └── ...
```

**문제점**:

| 상황 | 발생하는 문제 |
|:---|:---|
| **근태 기능 개발** | `components/CheckInButton.tsx` → `hooks/useAttendance.ts` → `api/attendance.ts` → `types/attendance.ts` → `store/attendanceStore.ts` 를 번갈아가며 수정 (5개 파일 왕복) |
| **어떤 컴포넌트가 어디서 쓰이는가?** | `components/` 폴더에서 이름만 봐서는 불명확 (CheckInButton이 근태용인지, 결재용인지 모름) |
| **도메인 관련 로직이 산재됨** | "출근/퇴근 지각 판별"이 `utils/calculations.ts` 에도 있고, `hooks/useAttendance.ts` 에도 있을 수 있음 (중복) |
| **새로운 개발자 온보딩** | "근태 기능을 추가하려면?" → "components, hooks, api, types, store 다 봐야 함" (5개 폴더) |
| **기능 삭제 시** | 어떤 파일들이 연관되어 있는지 확인하기 어려움 (검색으로만 가능) |
| **프로젝트 커질수록** | 각 폴더 크기가 무한정 커짐 (components에만 100개 파일?) |

**코드 예시 (기술 중심)**:

```typescript
// components/CheckInButton.tsx
import { useAttendance } from '@/hooks/useAttendance';
import { Button } from '@/components/common/Button';

export function CheckInButton() {
  const { recordCheckIn, isLoading } = useAttendance();
  return <Button onClick={recordCheckIn}>출근하기</Button>;
}

// hooks/useAttendance.ts
import { recordCheckInAPI } from '@/api/attendance';
import type { Attendance } from '@/types/attendance';

export function useAttendance() {
  // 비즈니스 로직과 UI 상태가 섞임
  // ...
}

// api/attendance.ts
// types/attendance.ts
// store/attendanceStore.ts
// utils/calculations.ts
// ... 5개 파일을 왔다갔다 하며 개발
```

---

### 2️⃣ FSD: 도메인 중심 구조 (Feature-Sliced Design)

**폴더 구조**:
```plaintext
src/
├── entities/attendance/
│   ├── model/types.ts              ✅ 근태 데이터 구조
│   ├── lib/calculations.ts         ✅ 근태 계산 로직 (순수 함수)
│   └── index.ts
│
├── features/attendance/
│   ├── api/actions.ts              ✅ Server Actions (비즈니스 동작)
│   ├── ui/CheckInButton.tsx        ✅ UI 컴포넌트
│   ├── model/index.ts              ✅ 근태 전용 Types/Schemas
│   └── index.ts
│
├── entities/approval/
│   ├── model/types.ts              ✅ 결재 데이터 구조
│   ├── lib/approvalLogic.ts        ✅ 결재 계산 로직
│   └── index.ts
│
├── features/approval/
│   ├── api/actions.ts              ✅ Server Actions
│   ├── ui/ApprovalForm.tsx         ✅ UI 컴포넌트
│   └── index.ts
│
└── shared/
    ├── ui/Button.tsx               ✅ 공통 컴포넌트
    └── api/db.ts                   ✅ 공유 라이브러리
```

**장점**:

| 상황 | 해결 |
|:---|:---|
| **근태 기능 개발** | `features/attendance/` 폴더만 열면 모든 것이 있음 (1개 폴더) |
| **어떤 컴포넌트가 어디서 쓰이는가?** | `features/attendance/` 이므로 "근태용이구나" 한눈에 파악 |
| **도메인 관련 로직 통합** | "지각 판별" 로직은 `entities/attendance/lib/` 에만 존재 (단일 책임) |
| **새로운 개발자 온보딩** | "근태 기능을 추가하려면?" → `features/attendance/` 폴더만 보면 됨 |
| **기능 삭제 시** | `features/attendance/` 폴더 통째로 삭제하면 끝 |
| **프로젝트 커질수록** | `features/` 하위에 새 도메인만 추가 (계층적 확장) |

**코드 예시 (FSD)**:

```typescript
// features/attendance/ui/CheckInButton.tsx
import { recordCheckIn } from '../api/actions';

export function CheckInButton({ userId }: Props) {
  // UI만 담당 (비즈니스 로직 없음)
  return <button onClick={() => recordCheckIn(userId)}>출근하기</button>;
}

// features/attendance/api/actions.ts
import { isLate } from '@/entities/attendance';  // 엔티티의 규칙 가져오기

export async function recordCheckIn(userId: number) {
  const status = isLate(getCurrentTime()) ? 'LATE' : 'NORMAL';
  // 엔티티의 규칙을 사용해서 동작 정의
}

// entities/attendance/lib/attendance-calculator.ts
export function isLate(time: string): boolean {
  // 비즈니스 규칙 (변하지 않는 핵심)
  return time > "09:00";
}
```

---

### 3️⃣ 실제 비교: 요구사항 변경 시나리오

#### 📌 시나리오: "지각 기준을 09:00에서 10:00으로 변경"

**❌ 기술 중심 방식**:
```
1. components/ 에서 CheckInButton 찾기 ❌ (몇 개가 있을 수도...)
2. hooks/useAttendance.ts 에서 지각 로직 수정
3. api/attendance.ts 에서도 관련 로직 확인
4. utils/calculations.ts 에서도 계산 로직 확인
5. store/attendanceStore.ts 에서 상태 업데이트 확인
6. types/attendance.ts 에서 타입 확인
→ 최소 5-6개 파일을 검토하고 수정해야 함
→ 혹시 빠뜨린 파일이 있을 수 있음 (검색으로 모든 "09:00"을 찾아야 함)
```

**✅ FSD 방식**:
```
1. entities/attendance/lib/attendance-calculator.ts 열기
2. isLate() 함수 수정: return time > "10:00"
3. 끝!
→ 1개 파일만 수정
→ 모든 곳에 자동으로 반영됨 (features/attendance, widgets/, app/ 모두)
```

#### 📌 시나리오: "급여 계산 시스템이 근무시간 계산이 필요"

**❌ 기술 중심 방식**:
```
1. utils/calculations.ts 에서 근무시간 계산 함수 찾기
2. 복사-붙여넣기로 features/payroll/utils/calculations.ts 생성?
3. 나중에 지각 기준 변경되면 두 파일 모두 수정? (중복 유지보수)
→ 코드 중복, 일관성 깨짐
```

**✅ FSD 방식**:
```
1. features/payroll/api/actions.ts 에서 필요한 함수 import
   import { calculateNetWorkMinutes } from '@/entities/attendance'
2. 사용
→ 단일 소스 오브 트루스 (Single Source of Truth)
→ 지각 기준 변경되어도 자동으로 급여 계산에도 반영
```

---

### 4️⃣ 폴더 깊이 비교

**기술 중심**:
```
src/components/CheckInButton.tsx
src/hooks/useAttendance.ts
src/api/attendance.ts
src/types/attendance.ts
src/utils/calculations.ts
src/store/attendanceStore.ts

→ 모두 같은 깊이 (1단계)
→ 도메인 정보를 폴더명에서 찾을 수 없음
→ 파일 갯수가 많아질수록 헷갈림
```

**FSD**:
```
src/entities/attendance/lib/calculations.ts
src/features/attendance/api/actions.ts
src/features/attendance/ui/CheckInButton.tsx
src/widgets/attendance-status/...

→ 폴더 경로 자체가 의미를 가짐
→ 계층/도메인이 명확
→ "attendance"를 폴더명으로 찾으면 모든 관련 코드를 찾을 수 있음
```

---

### 5️⃣ 팀 협업 효율성

| 상황 | 기술 중심 | FSD |
|:---|:---|:---|
| **누가 CheckInButton 수정 중?** | "components 폴더 전체"를 봐야 함 | `features/attendance/ui/` 만 보면 됨 |
| **출퇴근과 승인 로직이 충돌?** | 같은 api/ 폴더에서 병합 충돌 | 다른 폴더 (attendance vs approval) |
| **코드 리뷰** | "components 폴더 변경" (범위 넓음) | "features/attendance 변경" (범위 좁고 명확) |
| **병렬 개발** | 같은 폴더 경합 빈번 | 도메인별 분리로 충돌 최소화 |

---

### 6️⃣ 마이그레이션: 기술 중심 → FSD

만약 현재 기술 중심 구조라면:

```typescript
// Before (기술 중심)
src/
├── components/CheckInButton.tsx
├── hooks/useAttendance.ts
├── api/attendance.ts
├── types/attendance.ts
└── utils/calculations.ts

// After (FSD)
src/
├── entities/attendance/
│   ├── model/types.ts              (← types/attendance.ts 이동)
│   ├── lib/calculations.ts         (← utils/calculations.ts 이동)
│   └── index.ts
│
└── features/attendance/
    ├── api/actions.ts              (← hooks/useAttendance.ts + api/attendance.ts 통합)
    ├── ui/CheckInButton.tsx        (← components/CheckInButton.tsx 이동)
    └── index.ts
```

**단계별 전환 팁**:
1. 먼저 `entities/` 계층 만들기 (타입과 순수 함수)
2. 그 다음 `features/` 계층 만들기 (Server Actions + UI)
3. 기존 파일들 점진적으로 이동
4. `shared/` 에서 정말 공용인 것만 유지
5. 기존 폴더(`components/`, `hooks/`, `api/` 등) 정리

---

### 💡 결론: 왜 시니어들이 FSD를 선택하는가?

| 기준 | 기술 중심 | FSD |
|:---|:---|:---|
| **코드 위치 예측** | ❌ "Component인가 Hook인가?" | ✅ "features/[domain]에 있겠지" |
| **도메인 확장** | ❌ 모든 폴더에 파일 추가 | ✅ "features/[new-domain]" 폴더만 추가 |
| **문제 해결** | ❌ 5-10개 파일을 봐야 함 | ✅ 1-2개 폴더만 봐도 됨 |
| **새 팀원** | ❌ "아, 우리가 이런 식으로..." | ✅ "폴더 구조가 비즈니스 도메인" |
| **버그 추적** | ❌ 기술 계층 따라가기 | ✅ 비즈니스 계층 따라가기 |
| **중복 제거** | ❌ 수동으로 찾아야 함 | ✅ 자동으로 보임 |

**결국, FSD는 "코드의 지도가 비즈니스 지도와 일치한다"는 철학입니다.**
