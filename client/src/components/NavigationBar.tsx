import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface NavigationBarProps {
  currentPage: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  handleNavigate?: () => void;
  nextButtonTitle?: string;
}

export default function NavigationBar({
  currentPage,
  totalPages,
  setPage,
  handleNavigate,
  nextButtonTitle = 'Next'
}: NavigationBarProps) {
  const isLastPage = currentPage === totalPages;
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = !handleNavigate && isLastPage;

  const handlePrevious = () => setPage((prev: number) => prev - 1);
  const handleNext = isLastPage ? handleNavigate : () => setPage((prev: number) => prev + 1);

  return (
    <Box display='flex' justifyContent='space-between'>
      <Button size='large' variant='contained' disabled={isPreviousDisabled} onClick={handlePrevious}>
        Previous
      </Button>
      <Button size='large' variant='contained' disabled={isNextDisabled} onClick={handleNext}>
        {nextButtonTitle}
      </Button>
    </Box>
  );
}
