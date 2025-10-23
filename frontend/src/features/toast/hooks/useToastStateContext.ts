import { useContext } from 'react';

import { ToastStateContext } from '../contexts/ToastStateContext';

export function useToastStateContext() {
  const context = useContext(ToastStateContext);

  if (context === undefined) {
    throw new Error('useToastStateContext must be used within a ToastProvider');
  }

  return context;
}
