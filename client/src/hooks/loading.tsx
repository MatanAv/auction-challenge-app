import { useState } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);

  const stopLoading = () => setLoading(false);

  const LoadingDisplay = () =>
    loading && (
      <Box m={'auto'}>
        <CircularProgress />
      </Box>
    );

  return { loading, startLoading, stopLoading, LoadingDisplay };
};
