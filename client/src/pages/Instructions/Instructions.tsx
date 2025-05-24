import { useNavigate } from 'react-router-dom';
import { TIME_PER_QUESTION } from '@/constants/tests';

import Box from '@mui/material/Box';
import Timer from '@/components/Timer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IntroSlides } from './IntroSlides/IntroSlides';

import { listBoxStyle } from '@/styles';

interface InstructionsProps {
    type?: 'training' | 'game';
}

export default function Instructions({ type }: InstructionsProps) {
    const navigate = useNavigate();

    if (!type) {
        return <IntroSlides />;
    }

    return (
        <Box sx={{ ...listBoxStyle, alignItems: 'center', gap: 3 }}>
            <Typography variant='h4' color='red' fontWeight={500}>
                {type === 'training' ? 'Training (at least 2 rounds)' : 'Game Rounds'}
            </Typography>
            {type === 'game' && (
                <Typography variant='h5' color='primary'>
                    You will now participate in 24 different rounds.
                </Typography>
            )}
            <Typography variant='body1'>
                For each round you are allocated 6 minutes (which is plenty of time). If you don't respond within 3 minutes, you will be
                warned. If after being warned you don't respond again, the session will be terminated and you will lose your payment. The
                remaining time (in seconds) for the current round appears as a{' '}
                <Typography variant='body1' component='span' color={'success.light'} fontWeight={500}>
                    green
                </Typography>{' '}
                rectangle.
            </Typography>

            <Typography variant='body2' fontWeight={500}>
                Timer Illustration:
            </Typography>
            <Timer countTime={Date.now() + TIME_PER_QUESTION} />

            <Button variant='contained' onClick={() => navigate(`/${type}`)}>
                Start {type === 'training' ? 'Training' : 'Game'}
            </Button>
        </Box>
    );
}
