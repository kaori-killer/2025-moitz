import { useContext } from 'react';

import { ToastActionsContext } from '../contexts/ToastActionsContext';

export function useToastActionsContext() {
  const context = useContext(ToastActionsContext);

  if (context === undefined) {
    throw new Error(
      'useToastActionsContext must be used within a ToastProvider',
    );
  }

  return context;
}
