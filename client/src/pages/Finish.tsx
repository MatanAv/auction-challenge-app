import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { listBoxStyle } from '@/styles';

export default function Finish() {
  return (
    <Box sx={listBoxStyle}>
      <Typography variant='h4' fontWeight={800} color='green'>
        Game Finished
      </Typography>
      <Typography variant='h5'>Thank you for participating in the game!</Typography>
    </Box>
  );
}
