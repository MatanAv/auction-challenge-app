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
import QuestionResult from '@/components/AuctionGame/Question/QuestionResult';
import { GameResultsInfo } from './GameResults';

const testBoxStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 3
};

const TIME_PER_QUESTION = 60000 * 6;
const MIN_ANSWERS = 2;

export default function Training() {
  const navigate = useNavigate();

  const [round, setRound] = useState<number>(1);
  const [points, setPoints] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [isResultView, setIsResultView] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<IUserTestAnswer[]>([]);
  const [question, setQuestion] = useState<ITestQuestion>({} as ITestQuestion);
  const [selectedOption, setSelectedOption] = useState<AnswersValues | null>(null);

  const bonus = points > 0 ? points * 10 : 0;

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

    setUserAnswers([...userAnswers, userAnswer]);
  };

  const handleNext = () => {
    if (!isResultView) {
      addUserAnswer();
      setIsResultView(true);
    } else {
      setPoints(points + userAnswers[round - 1].profit);
      setIsResultView(false);
      setRound(round + 1);
    }
  };

  const handleSubmitTraining = async () => {
    await submitTraining(userAnswers);

    navigate('/results', {
      state: {
        round,
        points,
        bonus,
        type: 'training'
      } as GameResultsInfo
    });
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

  if (isLoading) return <CircularProgress />;

  return (
    <Box sx={{ ...listBoxStyle, gap: 10 }}>
      {isResultView ? (
        <QuestionResult question={question} selectedOption={selectedOption!} round={round} />
      ) : (
        <Box sx={testBoxStyle}>
          <ProgressBar round={round} points={points} bonus={bonus} />

          <Box sx={{ ...listBoxStyle, alignItems: 'center' }}>
            <Question question={question} selectedOption={selectedOption} setSelected={setSelectedOption} />
          </Box>

          <Timer key={round} countTime={startTime + TIME_PER_QUESTION} onTimeEnd={() => navigate('/')} />
        </Box>
      )}

      <Box display='flex' gap={3} justifyContent='center'>
        <Button onClick={handleNext} disabled={!selectedOption} variant='contained' color='primary'>
          Next Question
        </Button>
        {round >= MIN_ANSWERS && isResultView && (
          <Button onClick={handleSubmitTraining} variant='contained' color='primary'>
            Finish Training
          </Button>
        )}
      </Box>
    </Box>
  );
}
