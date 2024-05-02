import { AnyError } from '@/types/errors';
import { StatusError } from '@/interfaces/errors';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const DEFAULT_MESSAGE = 'Oops! Something went wrong.';

interface ErrorProps {
  error: AnyError | null;
}

export default function Error({ error }: ErrorProps) {
  if (!error) return null;

  const code = (error as StatusError).status;

  return (
    <Alert severity='error' sx={{ textAlign: 'left' }}>
      {code && <AlertTitle>{`Error ${code}:`}</AlertTitle>}
      {code ? error.message : DEFAULT_MESSAGE}
    </Alert>
  );
}
