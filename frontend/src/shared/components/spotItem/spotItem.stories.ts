import { withContainer } from '@sb/decorators/withContainer';

import SpotItem from './SpotItem';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta = {
  component: SpotItem,
  decorators: [withContainer],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'text' },
      description: '추천 장소 이름',
    },
    tagInfo: {
      control: { type: 'text' },
      description: '추천 장소 설명',
    },
    tag: {
      control: { type: 'text' },
      description: '추천 태그',
    },
    avgMinutes: {
      control: { type: 'number' },
      description: '추천 장소까지 평균 소요 시간(분)',
    },
    isBest: {
      control: { type: 'boolean' },
      description: '추천 장소의 best 여부',
    },
    onClick: {
      action: 'onClick',
    },
  },
} satisfies Meta<typeof SpotItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: '역이름',
    tagInfo: '설명입니다.',
    tag: 'GENERAL',
    avgMinutes: 10,
    isBest: false,
    onClick: () => {},
  },
};

export const Best: Story = {
  args: {
    name: '역이름',
    tagInfo: '설명입니다.',
    tag: 'FAIRNESS',
    avgMinutes: 10,
    isBest: true,
    onClick: () => {},
  },
};
