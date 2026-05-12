import { css } from '@emotion/react';

import { typography } from '@shared/styles/default.styled';
import { borderRadiusToken, tagBadgeColorToken } from '@shared/styles/tokens';

import { TagBadgeType } from './TagBadge';

type TagBadgeStyle = {
  color: string;
  backgroundColor: string;
};

const TAG_BADGE_STYLES: Record<TagBadgeType, TagBadgeStyle> = {
  FAIRNESS: {
    color: tagBadgeColorToken.fairness.text,
    backgroundColor: tagBadgeColorToken.fairness.bg,
  },
  MAX_BURDEN_RELIEF: {
    color: tagBadgeColorToken.maxBurdenRelief.text,
    backgroundColor: tagBadgeColorToken.maxBurdenRelief.bg,
  },
  EFFICIENCY: {
    color: tagBadgeColorToken.efficiency.text,
    backgroundColor: tagBadgeColorToken.efficiency.bg,
  },
  TRANSFER: {
    color: tagBadgeColorToken.transfer.text,
    backgroundColor: tagBadgeColorToken.transfer.bg,
  },
  GENERAL: {
    color: tagBadgeColorToken.general.text,
    backgroundColor: tagBadgeColorToken.general.bg,
  },
};

export const base = (type: TagBadgeType) => css`
  width: fit-content;
  padding: 3px 10px;
  border-radius: ${borderRadiusToken[20]};
  color: ${TAG_BADGE_STYLES[type].color};
  background-color: ${TAG_BADGE_STYLES[type].backgroundColor};
`;

export const text = () => css`
  transform: translate(0%, 5%);
  ${typography.sh2};
`;
