import { inline_flex, typography, shadow } from '@shared/styles/default.styled';

import IconVote from '@icons/icon-vote.svg';

import * as mapVoteButton from './mapVoteButton.styled';

interface MapVoteButtonProps {
  onClick: () => void;
}

function MapVoteButton({ onClick }: MapVoteButtonProps) {
  return (
    <button
      aria-label="투표하기"
      type="button"
      css={[
        inline_flex({ justify: 'center', align: 'center', gap: 4 }),
        shadow.map,
        mapVoteButton.base(),
      ]}
      onClick={onClick}
    >
      <img src={IconVote} alt="" aria-hidden="true" />
      <span css={typography.sh2}>투표하기</span>
    </button>
  );
}

export default MapVoteButton;
