import recommendedLocationsMock from '@mocks/recommendedLocationsMock';
import startingLocationsMock from '@mocks/startingLocationsMock';

import { withContainer } from '../../../../../.storybook/decorators/withContainer';

import BottomSheet from './BottomSheet';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta = {
  title: 'features/BottomSheet',
  component: BottomSheet,
  decorators: [withContainer],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    startingLocations: {
      control: { type: 'object' },
      description: '출발지 장소 리스트',
    },
    recommendedLocations: {
      control: { type: 'object' },
      description: '추천 장소 리스트',
    },
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    startingLocations: startingLocationsMock,
    recommendedLocations: recommendedLocationsMock,
  },
};

export const Short: Story = {
  args: {
    startingLocations: startingLocationsMock,
    recommendedLocations: recommendedLocationsMock.slice(0, 2),
  },
};
