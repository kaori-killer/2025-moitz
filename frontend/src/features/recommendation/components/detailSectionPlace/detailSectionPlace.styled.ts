import { css } from '@emotion/react';

import { colorToken } from '@shared/styles/tokens';

export const placeList = () => css`
  width: 100%;
  transition: transform 0.3s ease;
  overflow-x: auto;
  padding-bottom: 10px;
  margin-bottom: -10px;
  white-space: nowrap;
`;

export const paginationCur = () => css`
  color: ${colorToken.gray[3]};
`;

export const paginationTotal = () => css`
  color: ${colorToken.gray[5]};
`;

export const paginationButton = () => css`
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
`;
