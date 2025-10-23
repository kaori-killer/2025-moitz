import { css } from '@emotion/react';

import { typography } from '@shared/styles/default.styled';

export const footer = () => css`
  width: 100%;
`;

export const errorMessage = () => css`
  font-family: ${typography.c1};
  margin-top: 8px;
  padding: 8px 12px;
  text-align: center;
  color: red;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  transition: opacity 0.2s ease;
`;
