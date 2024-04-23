import { HttpStatusCode } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@/services/api/users';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { listBoxStyle } from '@/styles';

const UserRegister = () => {
  const navigate = useNavigate();
  const [workerId, setWorkerId] = useState('');

  const handleRegister = async () => {
    const response = await registerUser(workerId);

    if (response.status !== HttpStatusCode.Created) {
      // TODO: handle error
    }

    window.sessionStorage.setItem('worker_id', response.data._id);

    navigate('/instructions');
  };

  return (
    <Box component='form' noValidate autoComplete='off'>
      <TextField
        label='Worker ID'
        value={workerId}
        onChange={(e) => setWorkerId(e.target.value.trim())}
        InputProps={{
          endAdornment: (
            <Button variant='contained' color='primary' onClick={handleRegister} disabled={!workerId}>
              Register
            </Button>
          )
        }}
      />
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
