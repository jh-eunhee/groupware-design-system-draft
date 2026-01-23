# Storybook 설정 가이드

## Storybook 개요

Storybook은 UI 컴포넌트를 개발하고 테스트하기 위한 환경을 제공합니다.

## 설치

```bash
pnpm add -D @storybook/react @storybook/react-vite
```

## 설정

### .storybook/main.ts
```typescript
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.tsx'],
  addons: [],
}

export default config
```

### .storybook/preview.ts
```typescript
import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    layout: 'centered',
  },
}

export default preview
```

## 컴포넌트 스토리 작성

### src/components/Button.stories.tsx
```typescript
import { Button } from './Button'

export default {
  title: 'Components/Button',
  component: Button,
}

export const Default = {
  args: {
    children: 'Click me',
  },
}

export const Primary = {
  args: {
    variant: 'default',
    children: 'Primary Button',
  },
}
```

## 실행

```bash
pnpm storybook
```

더 자세한 내용은 Storybook 공식 문서를 참고하세요.
