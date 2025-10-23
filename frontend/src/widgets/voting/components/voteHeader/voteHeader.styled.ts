import { css } from '@emotion/react';

import { colorToken } from '@shared/styles/tokens';

export const icon = () => css`
  width: 24px;
  height: 28px;
`;

export const title = () => css`
  color: ${colorToken.gray[1]};
`;

export const description = () => css`
  color: ${colorToken.gray[1]};
`;

export const subDescription = () => css`
  color: ${colorToken.gray[6]};
`;
