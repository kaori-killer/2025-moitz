import { css } from '@emotion/react';

import { colorToken } from '@shared/styles/tokens';

export const resetButtonWrapper = () => css`
  width: 100%;
  text-align: right;
`;

export const resetButton = () => css`
  color: ${colorToken.gray[6]};
  background-color: transparent;
  cursor: pointer;
`;

export const refreshIcon = () => css`
  width: 16px;
  height: 16px;
`;
