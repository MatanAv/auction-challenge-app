import Countdown from 'react-countdown';
import Typography from '@mui/material/Typography';

// const TIME_PER_QUESTION = Date.now() + 60000 * 6;

interface TimerProps {
  countTime: number;
}

export default function Timer({ countTime }: TimerProps) {
  return (
    <Countdown
      date={countTime}
      renderer={({ formatted }) => (
        <Typography mb={1} align='left' variant='h5'>{`${formatted.minutes}:${formatted.seconds}`}</Typography>
      )}
    />
  );
}
