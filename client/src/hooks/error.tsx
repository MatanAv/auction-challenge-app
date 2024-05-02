import { useState } from 'react';
import { AnyError } from '@/types/errors';
import { getErrorFromAxiosError } from '@/utils/errors';

import Error from '@/components/Errors';

export const useError = () => {
  const [error, setError] = useState<AnyError | null>(null);

  const handleError = (error: unknown) => setError(getErrorFromAxiosError(error));

  const clearError = () => setError(null);

  const ErrorDisplay = () => <Error error={error} />;

  return { handleError, clearError, ErrorDisplay };
};
