import { useToastContext } from './useToastContext';

export function useToast() {
  const { isVisible, message, showToast } = useToastContext();

  return {
    isVisible,
    message,
    showToast,
  };
}
