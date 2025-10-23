import { createContext } from 'react';

interface ToastStateContextType {
  isVisible: boolean;
  message: string;
}

const ToastStateContext = createContext<ToastStateContextType | undefined>(
  undefined,
);

export { ToastStateContext, type ToastStateContextType };

