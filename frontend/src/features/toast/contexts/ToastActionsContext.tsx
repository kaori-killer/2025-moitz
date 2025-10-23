import { createContext } from 'react';

interface ToastActionsContextType {
  showToast: (message: string) => void;
  hideToast: () => void;
}

const ToastActionsContext = createContext<ToastActionsContextType | undefined>(
  undefined,
);

export { ToastActionsContext, type ToastActionsContextType };

