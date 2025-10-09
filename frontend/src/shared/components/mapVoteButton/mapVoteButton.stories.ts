import { withContainer } from '@sb/decorators/withContainer';

import MapVoteButton from './MapVoteButton';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta = {
  component: MapVoteButton,
  decorators: [withContainer],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      control: { type: 'object' },
      description: 'MapVoteButton을 클릭했을 때 실행될 함수',
    },
  },
} satisfies Meta<typeof MapVoteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => {
      console.log('투표하기');
    },
  },
};
