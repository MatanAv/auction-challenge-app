import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useCallback } from 'react';

interface NavigationBarProps {
    currentPage: number;
    totalPages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    handleNavigate?: () => void;
    nextButtonTitle?: string;
    onNext?: () => void;
}

export default function NavigationBar({
    currentPage,
    totalPages,
    setPage,
    handleNavigate,
    nextButtonTitle = 'הבא',
    onNext
}: NavigationBarProps) {
    const isLastPage = currentPage === totalPages;
    const isPreviousDisabled = currentPage === 1;
    const isNextDisabled = !handleNavigate && isLastPage;

    const handlePrevious = () => setPage((prev: number) => prev - 1);
    const handleNext = useCallback(() => {
        if (onNext) {
            onNext();
        }

        if (isLastPage && handleNavigate) {
            handleNavigate();
        } else {
            setPage((prev: number) => prev + 1);
        }
    }, [onNext, isLastPage, handleNavigate, setPage]);

    return (
        <Box display='flex' justifyContent='space-between'>
            <Button size='large' variant='contained' disabled={isNextDisabled} onClick={handleNext}>
                {nextButtonTitle}
            </Button>
            <Button size='large' variant='contained' disabled={isPreviousDisabled} onClick={handlePrevious}>
                הקודם
            </Button>
        </Box>
    );
}
