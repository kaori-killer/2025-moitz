import { ReactNode } from 'react';

import { useToastState } from '../hooks/useToastState';

import { ToastContext } from './ToastContext';

interface ToastProviderProps {
  children: ReactNode;
}

function ToastProvider({ children }: ToastProviderProps) {
  const toastState = useToastState();

  return (
    <ToastContext.Provider value={toastState}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
