import { useRouteError } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { listBoxStyle } from '@/styles';

type Error = {
  status: string;
  statusText: string;
};

export default function ErrorPage() {
  const error = useRouteError() as Error;
  console.error(error);

  return (
    <Box sx={{ ...listBoxStyle, gap: 2 }}>
      <Typography variant='h4'>Oops!</Typography>
      <Typography variant='subtitle1'>Sorry, an unexpected error has occurred.</Typography>
      <Typography variant='overline' component='i'>
        {error.status ? `${error.status} ${error.statusText}` : 'Unknown Error'}
      </Typography>
    </Box>
  );
}
