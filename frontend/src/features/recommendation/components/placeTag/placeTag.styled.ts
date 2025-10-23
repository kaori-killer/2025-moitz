import { css } from '@emotion/react';

import { borderRadiusToken, colorToken } from '@shared/styles/tokens';

export const base = (selected: boolean) => css`
  padding: 8px;
  border-radius: ${borderRadiusToken[20]};
  border: none;
  box-shadow: ${selected ? `none` : `0 0 0 1px ${colorToken.gray[7]}`};
  background-color: ${selected ? colorToken.main[4] : colorToken.gray[8]};
`;

export const text = (selected: boolean) => css`
  color: ${selected ? colorToken.main[1] : colorToken.gray[4]};
`;
