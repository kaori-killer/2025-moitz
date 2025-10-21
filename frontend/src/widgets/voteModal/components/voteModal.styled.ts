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

export const resetButtonWrapper = () => css`
  width: 100%;
  text-align: right;
`;

export const resetButton = () => css`
  color: ${colorToken.gray[6]};
  background-color: transparent;
  cursor: pointer;
`;

export const candidateListWrapper = () => css`
  width: 100%;
  height: 100%;
`;

export const candidateList = () => css`
  width: 100%;
  height: 100%;
`;

export const voteOption = () => css`
  width: 100%;
  padding: 8px 0;
`;

export const checkbox = () => css`
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid ${colorToken.gray[7]};
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:checked {
    background-color: ${colorToken.gray[8]};
    border-color: ${colorToken.main[2]};

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 10px;
      height: 10px;
      background-color: ${colorToken.main[2]};
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &:hover {
    border-color: ${colorToken.main[1]};
  }
`;

export const candidateName = () => css`
  flex: 1;
  color: ${colorToken.gray[1]};
`;

export const voteCount = () => css`
  color: ${colorToken.gray[6]};
  display: flex;
  align-items: center;
  gap: 4px;
`;
