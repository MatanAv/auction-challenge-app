import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnswersValues } from '@/types/users';
import { getQuestions, submitTraining } from '@/services/api/tests';
import { ITestQuestion, IUserTestAnswer } from '@/interfaces/tests';

import Box from '@mui/material/Box';
import Timer from '@/components/AuctionGame/Timer';
import Button from '@mui/material/Button';
import Question from '@/components/AuctionGame/Question/Question';
import ProgressBar from '@/components/AuctionGame/ProgressBar';
import CircularProgress from '@mui/material/CircularProgress';

import { listBoxStyle } from '@/styles';

const testBoxStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 3
};

const TIME_PER_QUESTION = 60000 * 6;
const MIN_ANSWERS = 2;

export default function AuctionGame() {
  const navigate = useNavigate();

  const [round, setRound] = useState<number>(1);
  const [points, setPoints] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [userAnswers, setUserAnswers] = useState<IUserTestAnswer[]>([]);
  const [question, setQuestion] = useState<ITestQuestion>({} as ITestQuestion);
  const [selectedOption, setSelectedOption] = useState<AnswersValues | null>(null);

  const addUserAnswer = () => {
    const userAnswer: IUserTestAnswer = {
      worker: window.sessionStorage.getItem('worker_id') || '',
      question: question._id,
      is_training: true,
      answer: selectedOption as AnswersValues,
      round,
      profit: question[`profit_${selectedOption}` as keyof ITestQuestion] as number,
      duration: Date.now() - startTime
    };

    const newUserAnswers = [...userAnswers, userAnswer];

    setUserAnswers(newUserAnswers);

    return newUserAnswers;
  };

  const handleNextRound = () => {
    const userAnswers = addUserAnswer();
    setPoints(points + userAnswers[round - 1].profit);
    setRound(round + 1);
  };

  const handleSubmitTraining = async () => {
    const updatedUserAnswers = selectedOption ? addUserAnswer() : userAnswers;

    const response = await submitTraining(updatedUserAnswers);

    navigate('/results', { state: { user_results: response.data } });
  };

  useEffect(() => {
    setIsLoading(true);

    getQuestions(1).then((response) => {
      setQuestion(response.data[0]);
      setStartTime(Date.now());
      setSelectedOption(null);
      setIsLoading(false);
    });
  }, [round]);

  return (
    <Box sx={{ ...listBoxStyle, gap: 10 }}>
      <Box sx={testBoxStyle}>
        <ProgressBar round={round} points={points} />

        <Box sx={{ ...listBoxStyle, alignItems: 'center' }}>
          {!isLoading ? (
            <Question question={question} selectedOption={selectedOption} setSelected={setSelectedOption} />
          ) : (
            <CircularProgress />
          )}
        </Box>

        <Timer key={round} countTime={startTime + TIME_PER_QUESTION} onTimeEnd={() => navigate('/')} />
      </Box>

      <Box display='flex' gap={3} justifyContent='flex-end'>
        <Button onClick={handleNextRound} disabled={!selectedOption} variant='contained' color='primary'>
          Next
        </Button>
        {round > MIN_ANSWERS && !isLoading ? (
          <Button onClick={handleSubmitTraining} variant='contained' color='primary'>
            Finish Training
          </Button>
        ) : null}
      </Box>
    </Box>
  );
}
