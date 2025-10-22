import { css } from '@emotion/react';

export const voteCountIcons = () => css``;

export const voteCountIcon = ({ zIndex }: { zIndex: number }) => css`
  width: 16px;
  height: 16px;
  position: relative;
  z-index: ${zIndex};

  &:not(:first-child) {
    margin-left: -8px;
  }
`;
