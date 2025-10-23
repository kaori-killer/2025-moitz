import { ReactNode } from 'react';

import { flex } from '@shared/styles/default.styled';

import Dot from '../dot/Dot';

interface SeparatedTextProps {
  children: ReactNode;
  isLast: boolean;
}

function SeparatedText({ children, isLast }: SeparatedTextProps) {
  return (
    <div
      css={flex({
        justify: 'center',
        align: 'center',
        gap: 5,
      })}
    >
      {children}
      {!isLast && <Dot size={3} colorType="main" colorTokenIndex={1} />}
    </div>
  );
}

export default SeparatedText;
