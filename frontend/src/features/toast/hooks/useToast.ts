import { useToastActionsContext } from './useToastActionsContext';
import { useToastStateContext } from './useToastStateContext';

export function useToast() {
  const { isVisible, message } = useToastStateContext();
  const { showToast, hideToast } = useToastActionsContext();

  return {
    isVisible,
    message,
    showToast,
    hideToast,
  };
}
