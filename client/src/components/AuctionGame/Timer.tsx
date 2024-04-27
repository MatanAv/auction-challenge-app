import Box from '@mui/material/Box';
import Countdown from 'react-countdown';
import Typography from '@mui/material/Typography';

import { red, green } from '@mui/material/colors';

interface TimerProps {
  countTime: number;
  onTimeEnd?: () => void;
}

export default function Timer({ countTime, onTimeEnd }: TimerProps) {
  return (
    <Countdown
      date={countTime}
      onComplete={onTimeEnd}
      renderer={({ minutes, formatted }) => {
        const isHalfway = minutes < 3;
        return (
          <Box
            sx={{
              bgcolor: isHalfway ? red[300] : green[300],
              borderStyle: 'solid',
              borderColor: isHalfway ? red[600] : green[600],
              borderWidth: 6,
              borderRadius: 5,
              p: 2
            }}
          >
            <Typography variant='h5' color='white'>{`${formatted.minutes}:${formatted.seconds}`}</Typography>
          </Box>
        );
      }}
    />
  );
}
