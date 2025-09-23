import { useState, useCallback, useEffect } from 'react';

type useToastParams = {
  duration: number;
};

type UseToastReturn = {
  isVisible: boolean;
  message: string;
  showToast: (message: string) => void;
};

export function useToast({ duration }: useToastParams): UseToastReturn {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showToast = useCallback((newMessage: string) => {
    setMessage(newMessage);
    setIsVisible(true);
  }, []);

  const hideToast = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, hideToast]);

  return {
    isVisible,
    message,
    showToast,
  };
}
