import { useState } from 'react';
import { ErrorType } from '@/types/errors';

export const useError = (): {
  error: ErrorType | null;
  handleError: (error: ErrorType) => void;
  clearError: () => void;
} => {
  const [error, setError] = useState<ErrorType | null>(null);

  const handleError = (error: ErrorType) => {
    setError(error);
  };

  const clearError = () => {
    setError(null);
  };

  return { error, handleError, clearError };
};
