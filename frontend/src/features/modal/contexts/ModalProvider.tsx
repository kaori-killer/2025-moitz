import { ReactNode, useState, useEffect } from 'react';

import { setModalFunctions } from '../utils/modal';

import ModalContext, { ModalItem } from './ModalContext';

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalItem[]>([]);

  const mount = (id: string, element: ReactNode) => {
    setModals((prev) => [...prev, { id, element }]);
  };

  const unmount = (id: string) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  };

  useEffect(() => {
    setModalFunctions(mount, unmount);
  }, []);

  return (
    <ModalContext.Provider value={{ modals, mount, unmount }}>
      {children}
      {modals.map(({ id, element }) => (
        <div key={id}>{element}</div>
      ))}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
