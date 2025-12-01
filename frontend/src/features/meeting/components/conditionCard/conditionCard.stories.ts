import ConditionCard from './ConditionCard';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta = {
  component: ConditionCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    iconText: {
      control: { type: 'text' },
      description: '아이콘에 표시될 텍스트',
    },
    contentText: {
      control: { type: 'text' },
      description: '컨텐츠에 표시될 텍스트',
    },
    descriptionText: {
      control: { type: 'text' },
      description: '설명 텍스트',
    },
    onClick: {
      description: '클릭 시 실행될 함수',
    },
    isSelected: {
      control: { type: 'boolean' },
      description: '선택 여부',
    },
  },
} satisfies Meta<typeof ConditionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    iconText: '☕️',
    contentText: '카페',
    descriptionText: '',
    onClick: () => {},
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    iconText: '☕️',
    contentText: '카페',
    descriptionText: '',
    onClick: () => {},
    isSelected: true,
  },
};
