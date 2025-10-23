import { css } from '@emotion/react';

import { colorToken } from '@shared/styles/tokens';

export const refreshButton = () => css`
  color: ${colorToken.gray[6]};
  background-color: transparent;
  cursor: pointer;
`;

export const refreshIcon = () => css`
  width: 15px;
  height: 15px;
`;
