import { ITestQuestion } from '@/interfaces/tests';
import { AnswersValues } from '@/types/users';
import { getOptionRows } from '@/utils/auction';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import OptionTable from './OptionTable';

interface QuestionResultProps {
  question: ITestQuestion;
  selectedOption: AnswersValues;
  round: number;
}

export default function QuestionResult({ question, selectedOption, round }: QuestionResultProps) {
  const upperCaseOption = selectedOption.toUpperCase();
  const soldForValue = selectedOption === 'a' ? question['VA1'] : question.actual_B_bid;

  const optionRows = getOptionRows(question, upperCaseOption as 'A' | 'B');

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
    </Box>
  );
}
