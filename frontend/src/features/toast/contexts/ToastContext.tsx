import { createContext } from 'react';

interface ToastContextType {
  isVisible: boolean;
  message: string;
  showToast: (message: string) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export { ToastContext, type ToastContextType };
