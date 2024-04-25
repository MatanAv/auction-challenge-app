import { ITestQuestion } from '@/interfaces/tests';
import { AnswersValues } from '@/types/users';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Radio from '@mui/material/Radio';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';

import { blueGrey, grey, red } from '@mui/material/colors';
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
  gap: 1
};

const optionsTableStyle = {
  '& *': {
    textAlign: 'center !important'
  }
};

type OptionEntry = [number, number];

interface OptionTableProps {
  rows: OptionEntry[];
}

function OptionTable({ rows }: OptionTableProps) {
  return (
    <TableContainer sx={optionsTableStyle} component={Paper}>
      <Table aria-label='simple table'>
        <TableHead sx={{ bgcolor: blueGrey[600], '& *': { color: 'white !important' } }}>
          <TableRow>
            <TableCell>Probability</TableCell>
            <TableCell>Second Highest Bid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ bgcolor: grey[50], '& *': { fontSize: '0.97rem !important' } }}>
          {rows.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{row[0]}</TableCell>
              <TableCell>${row[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

interface QuestionProps {
  question: ITestQuestion;
  userAnswer: AnswersValues | undefined | null;
  setAnswer: (answer: AnswersValues) => void;
}

export default function Question({ question, userAnswer, setAnswer }: QuestionProps) {
  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const value = target.value as AnswersValues;
    setAnswer(value);
  };

  const getOptionRows = (option: 'A' | 'B'): OptionEntry[] => {
    const rows: OptionEntry[] = [];
    const iterations = question[`LotNum${option}`];

    for (let i = 1; i <= iterations; i++) {
      const rowKey = `${option}${i}`;
      const rowEntry: OptionEntry = [
        question[`P${rowKey}` as keyof ITestQuestion] as number,
        question[`V${rowKey}` as keyof ITestQuestion] as number
      ];

      rows.push(rowEntry);
    }

    return rows;
  };

  const optionA = getOptionRows('A');
  const optionB = getOptionRows('B');

  return (
    <Box sx={{ ...listBoxStyle, mt: 3 }}>
      <Box sx={{ ...listBoxStyle, gap: 3 }}>
        <Typography variant='h5' fontWeight={500}>
          Your value is:
        </Typography>
        <Typography variant='h4' color='coral' fontWeight={500}>
          ${question.User_Val}
        </Typography>
        <Typography variant='subtitle1' color='black'>
          Choose which auction setting do you prefer (A / B) :
        </Typography>
      </Box>

      <Box sx={questionOptionsBoxStyle}>
        <Box sx={optionBoxStyle}>
          <Typography variant='button' color='primary'>
            Option A
            <Radio size='small' value='a' checked={userAnswer === 'a'} onClick={handleOnClick} />
          </Typography>
          {question.participation_fee ? (
            <Typography variant='body2' mt={2} fontWeight={500} color={red[400]}>
              Participation Fee: ${question.participation_fee}
            </Typography>
          ) : null}
          <OptionTable rows={optionA} />
        </Box>

        <Box sx={optionBoxStyle}>
          <Typography variant='button' color='primary'>
            Option B
            <Radio size='small' value='b' checked={userAnswer === 'b'} onClick={handleOnClick} />
          </Typography>
          <OptionTable rows={optionB} />
        </Box>
      </Box>
    </Box>
  );
}
