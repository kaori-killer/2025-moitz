import { css } from '@emotion/react';

import { borderRadiusToken, colorToken } from '@shared/styles/tokens';

export const base = () => css`
  width: 200px;
  min-width: 165px;
  cursor: pointer;
`;

export const image = () => css`
  width: 100%;
  height: 120px;
  background-color: ${colorToken.gray[7]};
  border-radius: ${borderRadiusToken[10]};
  object-fit: cover;
`;

export const content = () => css`
  width: 100%;
  padding: 0 5px;
`;

export const name = () => css`
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${colorToken.gray[1]};
`;

export const walkingTime = () => css`
  text-align: left;
  color: ${colorToken.gray[3]};
`;
