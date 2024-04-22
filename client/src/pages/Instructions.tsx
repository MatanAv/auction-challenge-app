import { useState } from 'react';
import { getSlideUrlById } from '@/utils/images';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NavigationBar from '@/components/NavigationBar';

const MAX_SLIDES = 20;

const imgStyle = {
  width: '100%',
  height: '600px'
};

export default function Instructions() {
  const [slideId, setSlideId] = useState(1);

  return (
    <Box>
      <Typography mb={1} align='left' variant='h5'>{`${slideId} / ${MAX_SLIDES}`}</Typography>
      <img style={imgStyle} src={getSlideUrlById(slideId)} />
      <NavigationBar currentPage={slideId} totalPages={MAX_SLIDES} setPage={setSlideId} />
    </Box>
  );
}
