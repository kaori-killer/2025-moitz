import {
  StartingPlacesMock,
  RecommendedLocationsMock,
} from '@mocks/LocationsMock';
import { LocationsMock } from '@mocks/LocationsMock';

import { withLayout } from '@sb/decorators/withLayout';

import BottomSheet from './BottomSheet';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta = {
  component: BottomSheet,
  decorators: [withLayout],
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

    selectedLocation: {
      control: { type: 'object' },
      description: '선택된 장소',
    },
    handleSpotClick: {
      action: 'handleSpotClick',
    },
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    startingLocations: StartingPlacesMock,
    recommendedLocations: RecommendedLocationsMock,
    conditionIDs: ['CAFE'],
    selectedLocation: null,
    handleSpotClick: () => {},
  },
};

export const Short: Story = {
  args: {
    startingLocations: StartingPlacesMock,
    recommendedLocations: RecommendedLocationsMock.slice(0, 2),
    conditionIDs: ['CAFE'],
    selectedLocation: null,
    handleSpotClick: () => {},
  },
};

export const Detail: Story = {
  args: {
    startingLocations: StartingPlacesMock,
    recommendedLocations: RecommendedLocationsMock.slice(0, 2),
    conditionIDs: ['CAFE'],
    selectedLocation: LocationsMock.locations[0],
    handleSpotClick: () => {},
  },
};
