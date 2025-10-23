import React, { useEffect } from 'react';

import { flex, grid_padding, shadow } from '@shared/styles/default.styled';

import IconCancel from '@icons/icon-cancel-gray.svg';

import * as modal from './modal.styled';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      css={[
        flex({ direction: 'column', justify: 'center', align: 'center' }),
        modal.backdrop(),
        grid_padding,
        shadow.dropdown,
      ]}
      onClick={handleBackdropClick}
    >
      <div css={[flex({ direction: 'column', gap: 20 }), modal.base()]}>
        <div css={flex({ justify: 'flex-end' })}>
          <button type="button" aria-label="모달 닫기" onClick={onClose}>
            <img src={IconCancel} alt="취소 버튼" aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
