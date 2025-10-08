import { createPortal } from 'react-dom';

import { flex, typography } from '@shared/styles/default.styled';

import IconToast from '@icons/icon-toast.svg';

import { useToastStateContext } from '../hooks/useToastStateContext';

import * as toast from './toast.styled';

function Toast() {
  const { isVisible, message } = useToastStateContext();

  if (!isVisible) return null;

  return createPortal(
    <div css={toast.container()}>
      <div
        css={[
          toast.content(),
          flex({ justify: 'center', align: 'center', gap: 10 }),
        ]}
      >
        <img src={IconToast} alt="icon-toast" />
        <span css={[toast.text(), typography.b1]}>{message}</span>
      </div>
    </div>,
    document.body,
  );
}

export default Toast;
