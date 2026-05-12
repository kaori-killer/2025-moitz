import Badge from './Badge';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta = {
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['category', 'transfer'],
      description: '뱃지 타입',
    },
    text: {
      control: { type: 'text' },
      description: '뱃지에 표시될 텍스트',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Category: Story = {
  args: { type: 'category', text: 'category' },
};

export const TransferCount: Story = {
  args: { type: 'transfer', text: '🚊 환승 0회' },
};

export const TransferTime: Story = {
  args: { type: 'transfer', text: '🕐 00분' },
};
