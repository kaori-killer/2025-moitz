import { useContext } from 'react';

import ModalContext from './ModalContext';

const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModalContext는 ModalProvider 안에 있어야 합니다.');
  }

  return context;
};

export default useModalContext;
