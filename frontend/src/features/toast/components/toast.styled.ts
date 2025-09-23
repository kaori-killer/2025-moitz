import { css, keyframes } from '@emotion/react';

import { borderRadiusToken, colorToken } from '@shared/styles/tokens';

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const stay = keyframes`
  from { opacity: 1; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

export const container = () => css`
  width: max-content;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
`;

export const content = () => css`
  min-width: calc(100%);
  padding: 10px 12px;
  text-align: center;
  background-color: ${colorToken.gray[7]};
  border-radius: ${borderRadiusToken[100]};
`;

export const contentWithAnimation = (duration: number) => css`
  animation:
    ${slideDown} 300ms ease-out forwards,
    ${stay} ${duration}ms linear forwards 300ms,
    ${slideUp} 300ms ease-in forwards ${duration + 300}ms;
`;

export const text = () => css`
  color: ${colorToken.gray[3]};
`;
