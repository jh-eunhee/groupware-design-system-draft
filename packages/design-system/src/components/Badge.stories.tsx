import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['gray', 'green', 'blue', 'red', 'yellow', 'black'],
      description: '배지의 색상 스타일',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '배지의 크기 (sm: 12px, md: 14px, lg: 16px)',
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

// ===== 개별 색상 스토리 =====
export const Gray: Story = {
  args: {
    children: 'Badge',
    color: 'gray',
    size: 'md',
  },
}

export const Green: Story = {
  args: {
    children: 'Badge',
    color: 'green',
    size: 'md',
  },
}

export const Blue: Story = {
  args: {
    children: 'Badge',
    color: 'blue',
    size: 'md',
  },
}

export const Red: Story = {
  args: {
    children: 'Badge',
    color: 'red',
    size: 'md',
  },
}

export const Yellow: Story = {
  args: {
    children: 'Badge',
    color: 'yellow',
    size: 'md',
  },
}

export const Black: Story = {
  args: {
    children: 'Badge',
    color: 'black',
    size: 'md',
  },
}

// ===== 크기별 스토리 =====
export const SmallSize: Story = {
  args: {
    children: 'Badge',
    color: 'gray',
    size: 'sm',
  },
}

export const MediumSize: Story = {
  args: {
    children: 'Badge',
    color: 'gray',
    size: 'md',
  },
}

export const LargeSize: Story = {
  args: {
    children: 'Badge',
    color: 'gray',
    size: 'lg',
  },
}

// ===== 조합 스토리 =====
export const AllColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge color="gray">Badge</Badge>
      <Badge color="green">Badge</Badge>
      <Badge color="blue">Badge</Badge>
      <Badge color="red">Badge</Badge>
      <Badge color="yellow">Badge</Badge>
      <Badge color="black">Badge</Badge>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Badge size="sm" color="gray">Badge</Badge>
      <Badge size="md" color="gray">Badge</Badge>
      <Badge size="lg" color="gray">Badge</Badge>
    </div>
  ),
}

export const ColorVariationsBySize: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3 items-center">
        <span className="text-sm font-medium text-gray-600 w-12">Small</span>
        <Badge size="sm" color="gray">Badge</Badge>
        <Badge size="sm" color="green">Badge</Badge>
        <Badge size="sm" color="blue">Badge</Badge>
        <Badge size="sm" color="red">Badge</Badge>
        <Badge size="sm" color="yellow">Badge</Badge>
        <Badge size="sm" color="black">Badge</Badge>
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        <span className="text-sm font-medium text-gray-600 w-12">Medium</span>
        <Badge size="md" color="gray">Badge</Badge>
        <Badge size="md" color="green">Badge</Badge>
        <Badge size="md" color="blue">Badge</Badge>
        <Badge size="md" color="red">Badge</Badge>
        <Badge size="md" color="yellow">Badge</Badge>
        <Badge size="md" color="black">Badge</Badge>
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        <span className="text-sm font-medium text-gray-600 w-12">Large</span>
        <Badge size="lg" color="gray">Badge</Badge>
        <Badge size="lg" color="green">Badge</Badge>
        <Badge size="lg" color="blue">Badge</Badge>
        <Badge size="lg" color="red">Badge</Badge>
        <Badge size="lg" color="yellow">Badge</Badge>
        <Badge size="lg" color="black">Badge</Badge>
      </div>
    </div>
  ),
}

// ===== 실제 사용 사례 =====
export const WithStatus: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">상태:</span>
        <Badge color="green">진행 중</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">상태:</span>
        <Badge color="blue">검토 필요</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">상태:</span>
        <Badge color="red">완료</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">상태:</span>
        <Badge color="yellow">대기 중</Badge>
      </div>
    </div>
  ),
}

export const WithTags: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Badge color="blue">기술</Badge>
        <Badge color="green">설계</Badge>
        <Badge color="yellow">검토</Badge>
        <Badge color="gray">아카이브</Badge>
      </div>
    </div>
  ),
}
