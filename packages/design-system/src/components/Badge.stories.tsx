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
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: '배지의 색상 스타일',
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default',
    variant: 'default',
  },
}

export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
  },
}

export const Warning: Story = {
  args: {
    children: 'Warning',
    variant: 'warning',
  },
}

export const Error: Story = {
  args: {
    children: 'Error',
    variant: 'error',
  },
}

export const Info: Story = {
  args: {
    children: 'Info',
    variant: 'info',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
}

export const WithText: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="success">✓ Completed</Badge>
      <Badge variant="warning">⚠ Pending</Badge>
      <Badge variant="error">✕ Failed</Badge>
      <Badge variant="info">ℹ New</Badge>
    </div>
  ),
}

export const InContext: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="font-medium">Order Status:</span>
        <Badge variant="success">Shipped</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium">Payment Status:</span>
        <Badge variant="error">Failed</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium">System Status:</span>
        <Badge variant="warning">Maintenance</Badge>
      </div>
    </div>
  ),
}
