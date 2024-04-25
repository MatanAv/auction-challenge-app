import Box from '@mui/material/Box';
import Countdown from 'react-countdown';
import Typography from '@mui/material/Typography';

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
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography mb={1} variant='h5'>{`${formatted.minutes}:${formatted.seconds}`}</Typography>
            {isHalfway ? (
              <Typography variant='body2' color={isHalfway ? 'red' : ''}>
                Hurry up!
                <br />
                Time is running out.
              </Typography>
            ) : null}
          </Box>
        );
      }}
    />
  );
}
