import { flex } from '@shared/styles/default.styled';

import IconVoteUser from '@icons/icon-vote-user.svg';

import * as voteCountIcons from './voteCountIcons.styled';

const MAX_VOTE_USER_ICON_COUNT = 5;

interface VoteCountIconsProps {
  count: number;
}

function VoteCountIcons({ count }: VoteCountIconsProps) {
  return (
    <div css={[flex({ align: 'center' }), voteCountIcons.voteCountIcons()]}>
      {Array.from(
        { length: Math.min(count, MAX_VOTE_USER_ICON_COUNT) },
        (_, index) => (
          <img
            key={index}
            src={IconVoteUser}
            alt=""
            aria-hidden="true"
            css={voteCountIcons.voteCountIcon({
              zIndex: count - index,
            })}
          />
        ),
      )}
    </div>
  );
}

export default VoteCountIcons;
