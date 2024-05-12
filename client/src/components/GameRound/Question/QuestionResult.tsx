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
  const userProfit = question[`profit_${selectedOption}`];
  const userWin = question[`win_${selectedOption}`];

  const optionRows = getOptionRows(question, upperCaseOption as 'A' | 'B');

  const isNextAppear = isTraining || round < GAME_QUESTIONS;
  const isFinishAppear = isTraining ? round >= TRAINING_MIN_ANSWERS : round >= GAME_QUESTIONS;

  const getPrizeCollectedString = () => {
    if (!userWin) return `${userProfit} points`;

    const calculatedNumbers = [question.User_Val, soldForValue];

    if (selectedOption === 'b' && question.participation_fee) {
      calculatedNumbers.push(question.participation_fee);
    }

    return `${calculatedNumbers.join(' - ')} = ${userProfit} points`;
  };

  return (
    <Box width='100%' display='flex' flexDirection='column' gap={10}>
      <Typography variant='h4' color={'red'} fontWeight={500}>
        Round {round} Results
      </Typography>

      <Box display='flex' alignItems='flex-start' gap={10}>
        <OptionTable rows={optionRows} />

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 1.5,
            '& strong': { color: '#2962ff' },
            '& p': { fontWeight: 500 },
            '& > *': { textAlign: 'left' }
          }}
        >
          <Typography variant='body1'>
            You decided to choose option <strong>{upperCaseOption}</strong>.
          </Typography>
          <Typography variant='body1'>
            Sold for <strong>${soldForValue}</strong>.
          </Typography>
          <Typography variant='body1'>
            Your value is = <strong>${question.User_Val}</strong>
          </Typography>
          <Typography variant='h6' mt={2} color={userWin ? 'green' : 'red'}>
            {userWin ? 'You won the auction!' : 'You did not win the auction!'}
          </Typography>
          <Typography variant='body1'>
            Prize collected: <strong>{getPrizeCollectedString()}</strong>
          </Typography>
        </Box>
      </Box>

      <Box display='flex' m={'auto'} justifyContent={'space-evenly'} width='50%'>
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
