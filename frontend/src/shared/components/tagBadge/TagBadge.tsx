import { flex } from '@shared/styles/default.styled';

import * as tagBadge from './tagBadge.styled';

export type TagBadgeType = 'FAIRNESS' | 'MAX_BURDEN_RELIEF' | 'EFFICIENCY' | 'TRANSFER' | 'GENERAL';

export const TAG_BADGE_LABEL: Record<TagBadgeType, string> = {
  FAIRNESS: '가장 공평',
  MAX_BURDEN_RELIEF: '최대 짧은',
  EFFICIENCY: '최소 평균',
  TRANSFER: '최소 환승',
  GENERAL: '적당한',
};

interface TagBadgeProps {
  type: TagBadgeType;
}

const VALID_TAG_BADGE_TYPES = new Set<string>(['FAIRNESS', 'MAX_BURDEN_RELIEF', 'EFFICIENCY', 'TRANSFER', 'GENERAL']);

function TagBadge({ type }: TagBadgeProps) {
  if (!VALID_TAG_BADGE_TYPES.has(type)) return null;

  return (
    <div css={[flex({ justify: 'center', align: 'center' }), tagBadge.base(type)]}>
      <span css={tagBadge.text()}>{TAG_BADGE_LABEL[type]}</span>
    </div>
  );
}

export default TagBadge;
