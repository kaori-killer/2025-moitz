import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Modal from './Modal';

describe('Modal', () => {
  const mockOnClose = jest.fn();
  const testContent = '모달 내용';
  const user = userEvent.setup();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  const renderModal = () => {
    return render(
      <Modal onClose={mockOnClose}>
        <div>{testContent}</div>
      </Modal>,
    );
  };

  describe('모달 backdrop 스크롤', () => {
    it('모달이 열리면 뒷 배경이 스크롤되지 않는다.', () => {
      // given
      renderModal();

      // then
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('모달이 닫히면 뒷 배경이 다시 스크롤된다.', () => {
      // given
      const { unmount } = renderModal();

      // when
      unmount();

      // then
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('모달 닫기', () => {
    it('취소 버튼을 클릭하면 모달이 닫힌다', async () => {
      // given
      renderModal();
      const cancelButton = screen.getByLabelText('모달 닫기');

      // when
      await user.click(cancelButton);

      // then
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('backdrop을 클릭하면 모달이 닫힌다', async () => {
      // given
      renderModal();
      const backdrop = screen.getByRole('dialog');

      // when
      await user.click(backdrop);

      // then
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('backdrop에서 모달 내부를 클릭하면 모달이 닫히지 않는다', async () => {
      // given
      renderModal();
      const modalContent = screen.getByText(testContent);

      // when
      await user.click(modalContent);

      // then
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('ESC 키를 누르면 모달이 닫힌다', () => {
      // given
      renderModal();

      // when
      fireEvent.keyDown(document, { key: 'Escape' });

      // then
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });
});
