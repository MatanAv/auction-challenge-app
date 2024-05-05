import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logoutUser } from '@/api/users';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { listBoxStyle } from '@/styles';

export default function End() {
  const location = useLocation();
  const approvalKey = location.state?.approval_key;

  useEffect(() => {
    logoutUser();
  }, []);

  return (
    <Box sx={{ ...listBoxStyle, gap: 5 }}>
      <Typography variant='h3' fontWeight={800} color='green'>
        Game Finished
      </Typography>
      {approvalKey ? (
        <Typography variant='h4'>
          This is your approval key: <strong style={{ color: 'red' }}>{approvalKey}</strong>
        </Typography>
      ) : (
        <Typography variant='h4' color='error'>
          You have failed to complete the game.
        </Typography>
      )}
      <Typography variant='h6'>Thank you for participating in the game!</Typography>
    </Box>
  );
}
