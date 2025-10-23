import { createContext, ReactNode } from 'react';

export type ModalItem = {
  id: string;
  element: ReactNode;
};

type ModalContextType = {
  modals: ModalItem[];
  mount: (id: string, element: ReactNode) => void;
  unmount: (id: string) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export default ModalContext;
