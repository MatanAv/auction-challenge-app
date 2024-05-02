import { AnswersValues } from '@/types/users';
import { getOptionRows } from '@/utils/auction';
import { ITestQuestion } from '@/interfaces/tests';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
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
  alignItems: 'center'
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
    <Box sx={{ ...listBoxStyle, mt: 3 }}>
      <Box sx={{ ...listBoxStyle, alignItems: 'center', gap: 3 }}>
        <Typography variant='h5' fontWeight={500}>
          Your value is:
        </Typography>
        <Typography variant='h4' color='coral' fontWeight={1000} p={1}>
          ${question.User_Val}
        </Typography>
        <Typography variant='subtitle1' color='black'>
          Choose which auction setting do you prefer (A / B) :
        </Typography>
      </Box>

      <Box sx={questionOptionsBoxStyle}>
        <Box sx={optionBoxStyle}>
          <Typography variant='button'>Option A</Typography>
          <Radio size='small' value='a' checked={selectedOption === 'a'} onClick={handleOnClick} />
          <OptionTable rows={optionA} />
        </Box>

        <Box sx={optionBoxStyle}>
          <Typography variant='button'>Option B</Typography>
          <Radio size='small' value='b' checked={selectedOption === 'b'} onClick={handleOnClick} />
          <OptionTable rows={optionB} />
          {question.participation_fee ? (
            <Typography variant='body1' fontWeight={500} color='red'>
              Participation Fee: ${question.participation_fee}
            </Typography>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
