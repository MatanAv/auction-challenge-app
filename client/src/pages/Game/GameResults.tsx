import { useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProgressBar from '@/components/GameRound/ProgressBar';

export type GameResultsInfo = {
  type: 'training' | 'game';
  round: number;
  points: number;
  bonus: number;
};

export default function GameResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, round, points, bonus } = location.state as GameResultsInfo;

  const handleOnClick = type === 'training' ? () => navigate('/user/info') : () => navigate('/user/survey');

  return (
    <Box display='flex' flexDirection='column' alignItems='center' gap={3}>
      <Typography variant='h4' color={'red'} fontWeight={500}>
        Game Results
      </Typography>
      <ProgressBar round={round} points={points} bonus={bonus} />
      <Button variant='contained' color='primary' onClick={handleOnClick}>
        Next
      </Button>
    </Box>
  );
}
