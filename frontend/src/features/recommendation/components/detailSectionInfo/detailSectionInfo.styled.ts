import { css } from '@emotion/react';

import { borderRadiusToken, colorToken } from '@shared/styles/tokens';

export const reason = () => css`
  padding: 10px;
  background-color: ${colorToken.bg[2]};
  border-radius: ${borderRadiusToken[10]};
`;

export const reasonText = () => css`
  color: ${colorToken.gray[2]};
  line-height: 1.5;
`;
