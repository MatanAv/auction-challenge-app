import { AnswersValues } from '@/types/users';
import { getOptionRows } from '@/utils/auction';
import { ITestQuestion } from '@/interfaces/tests';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OptionTable from './OptionTable';

import { listBoxStyle } from '@/styles';

const questionOptionsBoxStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 15,
  mb: 3
};

const optionBoxStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 1
};

const optionButtonStyle = {
  mb: 1,
  boxShadow: 3,
  minWidth: 50,
  fontSize: 17,
  fontWeight: 800,
  '&.Mui-disabled': {
    border: 'solid',
    borderWidth: 1,
    bgcolor: 'primary.main',
    color: 'white'
  }
};

interface QuestionProps {
  question: ITestQuestion;
  selectedOption: AnswersValues | null;
  setSelected: (answer: AnswersValues) => void;
}

export default function Question({ question, selectedOption, setSelected }: QuestionProps) {
  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const value = target.value as AnswersValues;
    setSelected(value);
  };

  const optionA = getOptionRows(question, 'A');
  const optionB = getOptionRows(question, 'B');

  return (
    <Box sx={{ ...listBoxStyle }}>
      <Box sx={{ ...listBoxStyle, alignItems: 'center', gap: 1 }}>
        <Typography variant='h5'>Your value is:</Typography>
        <Typography variant='h4' color='coral' fontWeight={1000} p={1}>
          ${question.User_Val}
        </Typography>
        <Typography variant='subtitle1' color='black'>
          Choose which auction setting do you prefer (A / B) :
        </Typography>
      </Box>

      <Box sx={questionOptionsBoxStyle}>
        <Box sx={optionBoxStyle}>
          <Button
            sx={optionButtonStyle}
            variant='outlined'
            color='primary'
            size='large'
            disabled={selectedOption === 'a'}
            onClick={handleOnClick}
            value='a'
          >
            A
          </Button>
          <OptionTable rows={optionA} />
        </Box>

        <Box sx={optionBoxStyle}>
          <Button
            sx={optionButtonStyle}
            variant='outlined'
            color='primary'
            size='large'
            disabled={selectedOption === 'b'}
            onClick={handleOnClick}
            value='b'
          >
            B
          </Button>
          <OptionTable rows={optionB} />
          {question.participation_fee && (
            <Typography variant='body1' fontWeight={500} color='red'>
              Participation Fee: ${question.participation_fee}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
