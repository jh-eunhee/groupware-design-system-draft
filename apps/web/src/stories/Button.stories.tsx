import type { Meta, StoryObj } from '@storybook/react';
import Button from '../components/Button';

/**
 * Button 컴포넌트는 Figma 디자인 시스템의 기본 버튼입니다.
 * 4가지 타입, 3가지 크기, 여러 상태를 지원합니다.
 * 
 * **노드 ID**: 4:2148
 */
const meta = {
  title: '라이브러리/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Figma 디자인 시스템의 기본 버튼 컴포넌트입니다. Primary, Secondary, Tertiary, Info 4가지 타입을 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'info'],
      description: '버튼의 타입',
    },
    size: {
      control: 'select',
      options: ['Default', 'small', 'large'],
      description: '버튼의 크기',
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'pressed', 'disabled'],
      description: '버튼의 상태',
    },
    icon: {
      control: 'boolean',
      description: '아이콘 표시 여부',
    },
    children: {
      control: 'text',
      description: '버튼 텍스트',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'primary',
    size: 'Default',
    state: 'default',
    icon: false,
    children: '확인',
  },
};

export const PrimaryLarge: Story = {
  args: {
    type: 'primary',
    size: 'large',
    state: 'default',
    icon: true,
    children: '다음',
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    size: 'small',
    state: 'default',
    icon: false,
    children: '취소',
  },
};

export const Tertiary: Story = {
  args: {
    type: 'tertiary',
    size: 'Default',
    state: 'default',
    icon: false,
    children: '옵션',
  },
};

export const Disabled: Story = {
  args: {
    type: 'primary',
    size: 'Default',
    state: 'disabled',
    icon: false,
    children: '비활성화',
  },
};

export const WithIcon: Story = {
  args: {
    type: 'primary',
    size: 'large',
    state: 'default',
    icon: true,
    children: '다음으로',
  },
};
