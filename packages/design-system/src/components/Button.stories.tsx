import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'
import { ArrowLeftIcon, ArrowRightIcon } from '../icons'

const meta = {
  title: '컴포넌트/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    buttonType: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '버튼의 타입',
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline'],
      description: '버튼의 스타일',
    },
    size: {
      control: 'select',
      options: ['xsm', 'sm', 'md', 'lg'],
      description: '버튼의 크기',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
    },
    children: {
      control: 'text',
      description: '버튼 텍스트',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Primary (초록색) - Solid
export const PrimarySolid: Story = {
  args: {
    buttonType: 'primary',
    variant: 'solid',
    size: 'md',
    children: '버튼명',
  },
}

// Primary (초록색) - Outline
export const PrimaryOutline: Story = {
  args: {
    buttonType: 'primary',
    variant: 'outline',
    size: 'md',
    children: '버튼명',
  },
}

// Secondary (진회색) - Solid
export const SecondarySolid: Story = {
  args: {
    buttonType: 'secondary',
    variant: 'solid',
    size: 'md',
    children: '버튼명',
  },
}

// Secondary (진회색) - Outline
export const SecondaryOutline: Story = {
  args: {
    buttonType: 'secondary',
    variant: 'outline',
    size: 'md',
    children: '버튼명',
  },
}

// Tertiary (연회색) - Solid
export const TertiarySolid: Story = {
  args: {
    buttonType: 'tertiary',
    variant: 'solid',
    size: 'md',
    children: '버튼명',
  },
}

// Tertiary (연회색) - Outline
export const TertiaryOutline: Story = {
  args: {
    buttonType: 'tertiary',
    variant: 'outline',
    size: 'md',
    children: '버튼명',
  },
}

// 크기 - xsm
export const SizeXsm: Story = {
  args: {
    buttonType: 'primary',
    variant: 'solid',
    size: 'xsm',
    children: '버튼명',
  },
}

// 크기 - sm
export const SizeSm: Story = {
  args: {
    buttonType: 'primary',
    variant: 'solid',
    size: 'sm',
    children: '버튼명',
  },
}

// 크기 - md (기본값)
export const SizeMd: Story = {
  args: {
    buttonType: 'primary',
    variant: 'solid',
    size: 'md',
    children: '버튼명',
  },
}

// 크기 - lg
export const SizeLg: Story = {
  args: {
    buttonType: 'primary',
    variant: 'solid',
    size: 'lg',
    children: '버튼명',
  },
}

// 비활성화
export const Disabled: Story = {
  args: {
    buttonType: 'primary',
    variant: 'solid',
    size: 'md',
    children: '버튼명',
    disabled: true,
  },
}

// 모든 크기 비교
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button buttonType="primary" size="xsm">
        xsm
      </Button>
      <Button buttonType="primary" size="sm">
        sm
      </Button>
      <Button buttonType="primary" size="md">
        md
      </Button>
      <Button buttonType="primary" size="lg">
        lg
      </Button>
    </div>
  ),
}

// 모든 타입 비교 (Solid)
export const AllTypesSolid: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Button buttonType="primary" variant="solid">
        Primary
      </Button>
      <Button buttonType="secondary" variant="solid">
        Secondary
      </Button>
      <Button buttonType="tertiary" variant="solid">
        Tertiary
      </Button>
    </div>
  ),
}

// 모든 타입 비교 (Outline)
export const AllTypesOutline: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Button buttonType="primary" variant="outline">
        Primary
      </Button>
      <Button buttonType="secondary" variant="outline">
        Secondary
      </Button>
      <Button buttonType="tertiary" variant="outline">
        Tertiary
      </Button>
    </div>
  ),
}

// 아이콘 포함 - 좌측 아이콘
export const WithLeftIcon: Story = {
  args: {
    buttonType: 'primary',
    variant: 'solid',
    size: 'md',
    children: '이전',
    leftIcon: <ArrowLeftIcon />,
  },
}

// 아이콘 포함 - 우측 아이콘
export const WithRightIcon: Story = {
  args: {
    buttonType: 'primary',
    variant: 'solid',
    size: 'md',
    children: '다음',
    rightIcon: <ArrowRightIcon />,
  },
}

// 아이콘 포함 - 좌우 아이콘
export const WithBothIcons: Story = {
  args: {
    buttonType: 'primary',
    variant: 'solid',
    size: 'md',
    children: '선택',
    leftIcon: <ArrowLeftIcon />,
    rightIcon: <ArrowRightIcon />,
  },
}
