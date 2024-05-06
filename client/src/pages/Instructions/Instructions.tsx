import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSlideUrlById } from '@/utils/images';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NavigationBar from '@/components/NavigationBar';
import CircularProgress from '@mui/material/CircularProgress';

import { listBoxStyle } from '@/styles';

const MAX_INTRO_SLIDES = 20;

const imgStyle = {
  width: '100%',
  height: '600px'
};

function IntroSlides() {
  const navigate = useNavigate();

  const [slideId, setSlideId] = useState(1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const slideSrc = getSlideUrlById(slideId);
  const isLastSlide = slideId === MAX_INTRO_SLIDES;

  const handleNavigate = isLastSlide ? () => navigate('/instructions/summary') : undefined;
  const handleImageLoad = () => setIsImageLoaded(true);

  useEffect(() => {
    setIsImageLoaded(false);
  }, [slideSrc]);

  return (
    <Box sx={listBoxStyle}>
      <Typography
        align='left'
        variant='h5'
        color={isLastSlide ? 'red' : 'black'}
        fontWeight={600}
      >{`${slideId} / ${MAX_INTRO_SLIDES}`}</Typography>

      {slideId === 1 && (
        <Typography variant='h4' color='primary' fontWeight={600}>
          The Choice Challenge App
        </Typography>
      )}

      <img style={imgStyle} src={slideSrc} onLoad={handleImageLoad} />
      {!isImageLoaded && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      )}

      <NavigationBar
        currentPage={slideId}
        totalPages={MAX_INTRO_SLIDES}
        setPage={setSlideId}
        handleNavigate={handleNavigate}
        nextButtonTitle={isLastSlide ? 'Start Quiz' : 'Next'}
      />
    </Box>
  );
}

interface InstructionsProps {
  type?: 'training' | 'game';
}

export default function Instructions({ type }: InstructionsProps) {
  const navigate = useNavigate();

  if (!type) {
    return <IntroSlides />;
  }

  return (
    <Box sx={{ ...listBoxStyle, alignItems: 'center', gap: 5 }}>
      <Typography variant='h4' color='red' fontWeight={500}>
        {type === 'training' ? 'Training (at least 2 rounds)' : 'Game Rounds'}
      </Typography>
      {type === 'game' && (
        <Typography variant='subtitle2' color='primary'>
          You will now participate in 25 different rounds.
        </Typography>
      )}
      <Typography variant='body1'>
        For each round you are allocated 6 minutes (which is plenty of time). If you don't respond within 3 minutes, you
        will be warned. If after being warned you don't respond again, the session will be terminated and you will lose
        your payment. The remaining time (in seconds) for the current round appears as a green circle.
      </Typography>
      <Button variant='contained' onClick={() => navigate(`/${type}`)}>
        Start {type === 'training' ? 'Training' : 'Game'}
      </Button>
    </Box>
  );
}
