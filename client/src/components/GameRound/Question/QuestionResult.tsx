import { ITestQuestion } from '@/interfaces/tests';
import { AnswersValues } from '@/types/users';
import { getOptionRows } from '@/utils/auction';
import { GAME_QUESTIONS, TRAINING_MIN_ANSWERS } from '@/constants/tests';

import Box from '@mui/material/Box';
import OptionTable from './OptionTable';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface QuestionResultProps {
  round: number;
  question: ITestQuestion;
  isTraining: boolean;
  selectedOption: AnswersValues;
  handleNext: () => void;
  handleSubmit: () => void;
}

export default function QuestionResult({
  round,
  question,
  isTraining,
  selectedOption,
  handleNext,
  handleSubmit
}: QuestionResultProps) {
  const upperCaseOption = selectedOption.toUpperCase();
  const soldForValue = selectedOption === 'a' ? question['VA1'] : question.actual_B_bid;
  const optionRows = getOptionRows(question, upperCaseOption as 'A' | 'B');

  const isNextAppear = isTraining || round < GAME_QUESTIONS;
  const isFinishAppear = isTraining ? round >= TRAINING_MIN_ANSWERS : round >= GAME_QUESTIONS;

  const getPrizeCollectedString = () => {
    const calculatedNumbers = [question.User_Val, soldForValue];

    if (selectedOption === 'b' && question.participation_fee) {
      calculatedNumbers.push(question.participation_fee);
    }

    return `${calculatedNumbers.join(' - ')} = $${question[`profit_${selectedOption}`]}`;
  };

  return (
    <Box width='100%' display='flex' flexDirection='column'>
      <Typography variant='h5' mb={8}>
        Round {round} Results
      </Typography>

      <Box display='flex' alignItems='flex-start' gap={10}>
        <OptionTable rows={optionRows} />

        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3, '& strong': { color: 'red' } }}>
          <Typography variant='body1'>
            You decided to choose option <strong>{upperCaseOption}</strong>.
          </Typography>
          <Typography variant='body1'>
            Sold for <strong>${soldForValue}</strong>.
          </Typography>
          <Typography variant='body1'>
            V = <strong>${question.User_Val}</strong>
          </Typography>
          <Typography variant='body1'>
            Prize collected: <strong>{getPrizeCollectedString()}</strong>
          </Typography>
        </Box>
      </Box>

      <Box display='flex'>
        {isNextAppear && (
          <Button onClick={handleNext} variant='contained' color='primary'>
            Next Question
          </Button>
        )}

        {isFinishAppear && (
          <Button onClick={handleSubmit} variant='contained' color='primary'>
            Finish
          </Button>
        )}
      </Box>
    </Box>
  );
}
