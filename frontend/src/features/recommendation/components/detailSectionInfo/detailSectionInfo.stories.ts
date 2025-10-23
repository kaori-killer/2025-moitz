import { LocationsMock } from '@mocks/LocationsMock';

import { withContainer } from '@sb/decorators/withContainer';

import DetailSectionInfo from './DetailSectionInfo';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta = {
  decorators: [withContainer],
  component: DetailSectionInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selectedLocation: {
      control: { type: 'object' },
      description: '선택된 장소 정보 (장소 이름, 설명, 주변 장소 목록 등)',
    },
  },
} satisfies Meta<typeof DetailSectionInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedLocation: {
      ...LocationsMock.locations[0],
      places: {
        STUDY_CAFE: LocationsMock.locations[0].places.STUDY_CAFE,
        SPACE_RENTAL: LocationsMock.locations[0].places.SPACE_RENTAL,
      },
    },
  },
};
