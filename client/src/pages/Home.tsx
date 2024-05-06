import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useError } from '@/hooks/error';
import { useLoading } from '@/hooks/loading';
import { registerUser } from '@/api/users';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { listBoxStyle } from '@/styles';

const UserRegister = () => {
  const navigate = useNavigate();
  const { handleError, clearError, ErrorDisplay } = useError();
  const { startLoading, stopLoading, LoadingDisplay } = useLoading();

  const [workerId, setWorkerId] = useState('');

  const handleRegister = async () => {
    clearError();
    startLoading();

    try {
      const response = await registerUser(workerId);

      window.sessionStorage.clear();
      window.sessionStorage.setItem('worker_id', response.data._id);

      navigate('/instructions');
    } catch (error) {
      handleError(error);
    } finally {
      stopLoading();
    }
  };

  const onEnterDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRegister();
    }
  };

  return (
    <Box display='flex' flexDirection='column' gap={3} component='form' noValidate autoComplete='off'>
      <TextField
        label='Worker ID'
        value={workerId}
        onChange={(e) => setWorkerId(e.target.value.trim())}
        onKeyDown={onEnterDown}
        InputProps={{
          endAdornment: (
            <Button variant='contained' color='primary' onClick={handleRegister} disabled={!workerId}>
              Register
            </Button>
          )
        }}
      />

      <LoadingDisplay />
      <ErrorDisplay />
    </Box>
  );
};

export default function Home() {
  return (
    <Box sx={listBoxStyle}>
      <Typography variant='h5'>Welcome!</Typography>
      <Typography variant='body1'>In order to start the challenge, please enter your Worker ID:</Typography>
      <UserRegister />
    </Box>
  );
}
