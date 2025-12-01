import { LocationsMock, StartingPlacesMock } from '@mocks/LocationsMock';

import { withContainer } from '@sb/decorators/withContainer';

import DetailSectionRoute from './DetailSectionRoute';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta = {
  decorators: [withContainer],
  component: DetailSectionRoute,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    startingPlaces: {
      control: { type: 'object' },
      description: '출발지 정보',
    },
    selectedLocation: {
      control: { type: 'object' },
      description: '선택된 장소 정보',
    },
  },
} satisfies Meta<typeof DetailSectionRoute>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    startingPlaces: StartingPlacesMock,
    selectedLocation: {
      ...LocationsMock.locations[0],
      places: {
        STUDY_CAFE: LocationsMock.locations[0].places.STUDY_CAFE,
        SPACE_RENTAL: LocationsMock.locations[0].places.SPACE_RENTAL,
      },
    },
  },
};
