import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Countdown from 'react-countdown';
import Typography from '@mui/material/Typography';

import { red, green } from '@mui/material/colors';
import { useState } from 'react';

interface TimerProps {
  countTime: number;
  onTimeEnd?: () => void;
}

export default function Timer({ countTime, onTimeEnd }: TimerProps) {
  const [alertOpen, setAlertOpen] = useState(true);

  const handleAlertClose = () => {
    setTimeout(() => {
      setAlertOpen(false);
    }, 10000);
  };

  return (
    <Countdown
      date={countTime}
      onComplete={onTimeEnd}
      renderer={({ minutes, seconds, formatted }) => {
        const isHalfway = minutes < 3;

        if (minutes === 2 && seconds === 59) {
          handleAlertClose();
        }

        return (
          <Box display='flex' flexDirection='column' alignItems='center' gap={2}>
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
            {isHalfway && alertOpen && (
              <Alert sx={{ minWidth: 190 }} severity='warning' onClose={() => setAlertOpen(false)}>
                Hurry up! Time is running out!
              </Alert>
            )}
          </Box>
        );
      }}
    />
  );
}
