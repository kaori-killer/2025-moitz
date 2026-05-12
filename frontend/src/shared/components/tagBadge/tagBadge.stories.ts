import TagBadge from './TagBadge';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta = {
  component: TagBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['FAIRNESS', 'MAX_BURDEN_RELIEF', 'EFFICIENCY', 'TRANSFER', 'GENERAL'],
      description: '태그 뱃지 타입',
    },
  },
} satisfies Meta<typeof TagBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fairness: Story = {
  args: { type: 'FAIRNESS' },
};

export const MaxBurdenRelief: Story = {
  args: { type: 'MAX_BURDEN_RELIEF' },
};

export const Efficiency: Story = {
  args: { type: 'EFFICIENCY' },
};

export const Transfer: Story = {
  args: { type: 'TRANSFER' },
};

export const General: Story = {
  args: { type: 'GENERAL' },
};
