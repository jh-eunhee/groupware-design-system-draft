import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost'],
      description: '버튼의 스타일 종류',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '버튼의 크기',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'md',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
    size: 'md',
  },
}

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
    size: 'md',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
    size: 'md',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
    size: 'md',
  },
}

export const Small: Story = {
  args: {
    children: 'Small',
    variant: 'default',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    children: 'Large',
    variant: 'default',
    size: 'lg',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'default',
    size: 'md',
    disabled: true,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}
