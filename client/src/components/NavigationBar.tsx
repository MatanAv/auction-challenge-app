import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface NavigationBarProps {
  currentPage: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  additionalButtons?: React.ReactNode;
}

export default function NavigationBar({ currentPage, totalPages, setPage, additionalButtons }: NavigationBarProps) {
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  console.log(additionalButtons); // TODO: handle additionalButtons

  return (
    <Box display='flex' justifyContent='space-between' my={5}>
      <Button
        size='large'
        variant='contained'
        disabled={isPreviousDisabled}
        onClick={() => setPage((prev: number) => prev - 1)}
      >
        Previous
      </Button>
      <Button
        size='large'
        variant='contained'
        disabled={isNextDisabled}
        onClick={() => setPage((prev: number) => prev + 1)}
      >
        Next
      </Button>
    </Box>
  );
}
