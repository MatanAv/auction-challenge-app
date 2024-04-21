import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { AxiosError } from 'axios';
import { ErrorType } from '@/types/errors';

const DEFAULT_MESSAGE = 'Oops! Something went wrong.';

interface ErrorProps {
  error: ErrorType;
}

const Error = ({ error }: ErrorProps) => {
  const code = (error as AxiosError).response?.status;

  return (
    <Alert severity='error' sx={{ textAlign: 'left' }}>
      {code ? <AlertTitle>{`Error ${code}:`}</AlertTitle> : null}
      {code ? error.message : DEFAULT_MESSAGE}
    </Alert>
  );
};

export default Error;
