import TagBadge, { TagBadgeType } from '@shared/components/tagBadge/TagBadge';
import { flex, typography } from '@shared/styles/default.styled';

import * as spotItem from './spotItem.styled';

interface SpotItemProps {
  name: string;
  tagInfo: string;
  tag: TagBadgeType;
  avgMinutes: number;
  onClick: () => void;
}

function SpotItem({
  name,
  tagInfo,
  tag,
  avgMinutes,
  onClick,
}: SpotItemProps) {
  return (
    <button
      type="button"
      css={[
        flex({ justify: 'center', align: 'center', gap: 15 }),
        spotItem.base(),
      ]}
      onClick={onClick}
      aria-label={`${name}, ${tagInfo}, 평균 이동시간 ${avgMinutes}분`}
    >
      <div
        css={[
          flex({ direction: 'column', gap: 10 }),
          spotItem.contents_container(),
        ]}
      >
        <div css={flex({ justify: 'space-between', align: 'center' })}>
          <div css={flex({ align: 'center', gap: 14 })}>
            <span css={typography.h3}>{name}</span>
            <TagBadge type={tag} />
          </div>
          <span css={typography.c1}>평균 {avgMinutes}분</span>
        </div>
        <p css={[flex(), typography.c1, spotItem.description()]}>
          {tagInfo}
        </p>
      </div>
    </button>
  );
}

export default SpotItem;
