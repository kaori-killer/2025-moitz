import { ReactNode, useMemo } from 'react';

import { useToastState } from '../hooks/useToastState';

import { ToastActionsContext } from './ToastActionsContext';
import { ToastStateContext } from './ToastStateContext';

interface ToastProviderProps {
  children: ReactNode;
}

function ToastProvider({ children }: ToastProviderProps) {
  const toastState = useToastState();

  // 상태만 분리 (isVisible, message)
  const state = useMemo(
    () => ({
      isVisible: toastState.isVisible,
      message: toastState.message,
    }),
    [toastState.isVisible, toastState.message],
  );

  // 액션만 분리 (showToast, hideToast)
  const actions = useMemo(
    () => ({
      showToast: toastState.showToast,
      hideToast: toastState.hideToast,
    }),
    [toastState.showToast, toastState.hideToast],
  );

  return (
    <ToastActionsContext.Provider value={actions}>
      <ToastStateContext.Provider value={state}>
        {children}
      </ToastStateContext.Provider>
    </ToastActionsContext.Provider>
  );
}

export default ToastProvider;
