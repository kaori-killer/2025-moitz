import { css } from '@emotion/react';

export const candidateListWrapper = () => css`
  width: 100%;
  height: 100%;
`;

export const refreshButtonWrapper = () => css`
  width: 100%;
  text-align: right;
`;

export const candidateList = () => css`
  width: 100%;
  height: 100%;
`;

const baseContainer = () => css`
  width: 100%;
  min-height: 230px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const loadingContainer = baseContainer;
export const errorContainer = baseContainer;
