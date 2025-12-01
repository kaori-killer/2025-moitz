import PlaceTag from './PlaceTag';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta = {
  component: PlaceTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: { type: 'object' },
      description: '태그 텍스트',
    },
    selected: {
      control: { type: 'boolean' },
      description: '태그 선택 여부',
    },
    onClick: {
      description: '태그 클릭 시 실행될 함수',
    },
  },
} satisfies Meta<typeof PlaceTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: '스터디카페',
    selected: false,
    onClick: () => {},
  },
};

export const Selected: Story = {
  args: {
    text: '스터디카페',
    selected: true,
    onClick: () => {},
  },
};
