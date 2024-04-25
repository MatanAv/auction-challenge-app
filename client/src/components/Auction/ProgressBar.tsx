import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

interface ProgressBarProps {
  round: number;
  points: number;
  totalRounds?: number;
}

const progressBarStyle = {
  maxWidth: 300,
  minWidth: 175,
  backgroundColor: '#6fbf73',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  gap: 0.75,
  py: 1,
  px: 2,
  '& *': {
    fontSize: '1.025rem !important'
  }
};

export default function ProgressBar({ round = 1, totalRounds = round, points = 0 }: ProgressBarProps) {
  return (
    <Paper sx={progressBarStyle} elevation={2}>
      <Box display='flex'>
        <Typography sx={{ flexGrow: 1 }} variant='body2'>
          Round :
        </Typography>
        <Typography sx={{ flexGrow: 2, textAlign: 'center' }} variant='body2'>
          {round}/{totalRounds}
        </Typography>
      </Box>
      <Divider />
      <Box display='flex'>
        <Typography sx={{ flexGrow: 1 }} variant='body2'>
          Points :
        </Typography>
        <Typography sx={{ flexGrow: 2, textAlign: 'center' }} variant='body2'>
          {points}
        </Typography>
      </Box>
      <Divider />
      <Box display='flex'>
        <Typography sx={{ flexGrow: 1 }} variant='body2'>
          Bonus :
        </Typography>
        <Typography sx={{ flexGrow: 2, textAlign: 'center' }} variant='body2'>
          {points * 10} ¢
        </Typography>
      </Box>
    </Paper>
  );
}
