import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSlideUrlById } from '@/utils/images';

import Box from '@mui/material/Box';
import NavigationBar from '@/components/NavigationBar';
import CircularProgress from '@mui/material/CircularProgress';

import { listBoxStyle } from '@/styles';
import styles from './IntroSlides.module.scss';

const TOTAL_INTRO_SLIDES = 16;

export const IntroSlides = () => {
    const navigate = useNavigate();

    const [slideId, setSlideId] = useState(1);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const slideSrc = getSlideUrlById(slideId);
    const isLastSlide = slideId === TOTAL_INTRO_SLIDES;

    const handleNavigate = useCallback(() => (isLastSlide ? navigate('/instructions/summary') : undefined), [isLastSlide, navigate]);
    const handleImageLoad = useCallback(() => setIsImageLoaded(true), []);

    useEffect(() => {
        setIsImageLoaded(false);
    }, [slideSrc]);

    return (
        <Box sx={{ ...listBoxStyle, gap: '20px', width: '1400px' }}>
            <div className={styles.header_container}>
                <h4 color={isLastSlide ? 'red' : 'black'}>{`${slideId} / ${TOTAL_INTRO_SLIDES}`}</h4>
                <h3>The Choice Challenge App</h3>
            </div>

            <div className={styles.slide_container}>
                <img
                    style={{ display: isImageLoaded ? 'block' : 'none' }}
                    src={slideSrc}
                    height={600}
                    width={1300}
                    onLoad={handleImageLoad}
                />
                <CircularProgress
                    sx={{
                        display: isImageLoaded ? 'none' : 'flex',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                />
            </div>

            <NavigationBar currentPage={slideId} totalPages={TOTAL_INTRO_SLIDES} setPage={setSlideId} handleNavigate={handleNavigate} />
        </Box>
    );
};
