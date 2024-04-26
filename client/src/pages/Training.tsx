import { useNavigate } from 'react-router-dom';
import { getQuestions, submitTraining } from '@/services/api/tests';
import { useEffect, useState } from 'react';
import { ITestQuestion, IUserTestAnswer } from '@/interfaces/tests';

import Box from '@mui/material/Box';
import Timer from '@/components/Timer';
import Button from '@mui/material/Button';
import Question from '@/components/Auction/Question';
import ProgressBar from '@/components/Auction/ProgressBar';
import CircularProgress from '@mui/material/CircularProgress';

import { listBoxStyle } from '@/styles';

const TIME_PER_QUESTION = 60000 * 6;

const testBoxStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 3
};

export default function Training() {
  const navigate = useNavigate();

  const [round, setRound] = useState<number>(1);
  const [points, setPoints] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [userAnswers, setUserAnswers] = useState<IUserTestAnswer[]>([]);
  const [question, setQuestion] = useState<ITestQuestion>({} as ITestQuestion);

  const setAnswer = (answer: 'a' | 'b') => {
    const userAnswer: IUserTestAnswer = {
      worker: window.sessionStorage.getItem('worker_id') || '',
      question: question._id,
      is_training: true,
      answer,
      round,
      profit: question[`profit_${answer}` as keyof ITestQuestion] as number,
      duration: Date.now() - startTime
    };

    const newAnswers = [...userAnswers];
    newAnswers[round - 1] = userAnswer;
    setUserAnswers(newAnswers);
  };

  const setAnswerDuration = () => {
    const userAnswer = userAnswers[round - 1];
    userAnswer.duration = Date.now() - startTime;
    setUserAnswers([...userAnswers]);
  };

  const handleNextRound = () => {
    setAnswerDuration();
    setPoints(points + userAnswers[round - 1].profit);
    setRound(round + 1);
  };

  const handleSubmitTraining = async () => {
    setAnswerDuration();

    const response = await submitTraining(userAnswers);

    if (response) {
      navigate('/results');
    }
  };

  const onTimeEnd = () => {
    return navigate('/');
  };

  useEffect(() => {
    setIsLoading(true);

    getQuestions(1).then((response) => {
      setQuestion(response.data[0]);
      setIsLoading(false);
      setStartTime(Date.now());
    });
  }, [round]);

  return (
    <Box sx={{ ...listBoxStyle, gap: 10 }}>
      <Box sx={testBoxStyle}>
        <ProgressBar round={round} points={points} />

        <Box sx={{ ...listBoxStyle, alignItems: 'center' }}>
          {!isLoading ? (
            <Question question={question} userAnswer={userAnswers[round - 1]?.answer} setAnswer={setAnswer} />
          ) : (
            <CircularProgress />
          )}
        </Box>

        <Timer key={round} countTime={startTime + TIME_PER_QUESTION} onTimeEnd={onTimeEnd} />
      </Box>

      <Box display='flex' gap={3} justifyContent='flex-end'>
        <Button onClick={handleNextRound} disabled={!userAnswers[round - 1]} variant='contained' color='primary'>
          Next
        </Button>
        {round > 1 && !isLoading ? (
          <Button onClick={handleSubmitTraining} disabled={!userAnswers[round - 1]} variant='contained' color='primary'>
            Finish Training
          </Button>
        ) : null}
      </Box>
    </Box>
  );
}
