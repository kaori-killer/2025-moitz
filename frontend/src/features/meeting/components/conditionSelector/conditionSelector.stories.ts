import { withLayout } from '@sb/decorators/withLayout';

import ConditionSelector from './ConditionSelector';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta = {
  component: ConditionSelector,
  decorators: [withLayout],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selectedConditionIDs: {
      control: { type: 'object' },
      description: '선택된 조건 ID들',
    },
    onSelect: {
      description: '조건 ID 업데이트 시 실행될 함수',
    },
  },
} satisfies Meta<typeof ConditionSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedConditionIDs: [],
    onSelect: () => {},
  },
};

export const WithSelectedConditions: Story = {
  args: {
    selectedConditionIDs: ['CAFE', 'RESTAURANT'],
    onSelect: () => {},
  },
};
