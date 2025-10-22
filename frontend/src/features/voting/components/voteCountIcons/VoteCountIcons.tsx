import { flex } from '@shared/styles/default.styled';

import IconVoteUser from '@icons/icon-vote-user.svg';

import * as voteCountIcons from './voteCountIcons.styled';

interface VoteCountIconsProps {
  count: number;
}

function VoteCountIcons({ count }: VoteCountIconsProps) {
  return (
    <div css={[flex({ align: 'center' }), voteCountIcons.voteCountIcons()]}>
      {Array.from({ length: count }, (_, index) => (
        <img
          key={index}
          src={IconVoteUser}
          alt="투표 유저 아이콘"
          css={voteCountIcons.voteCountIcon({
            zIndex: count - index,
          })}
        />
      ))}
    </div>
  );
}

export default VoteCountIcons;
