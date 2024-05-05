import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useError } from '@/hooks/error';
import { FailureReasons } from '@/enums/users';
import { sendFailureReason } from '@/api/users';
import { GameResultsInfo } from './GameResults';
import { IUserTest, IUserTraining } from '@/interfaces/user';
import { ITestQuestion, IUserTestAnswer } from '@/interfaces/tests';
import { GAME_QUESTIONS, TRAINING_QUESTIONS, TIME_PER_QUESTION } from '@/constants/tests';
import { getQuestions, sendTimeout, submitTest, submitTraining } from '@/api/tests';

import Box from '@mui/material/Box';
import GameRound from '@/components/GameRound';
import CircularProgress from '@mui/material/CircularProgress';

interface GameProps {
  gameType?: 'training' | 'game';
}

export default function Game({ gameType = 'game' }: GameProps) {
  const navigate = useNavigate();
  const { handleError, clearError, ErrorDisplay } = useError();

  const [questions, setQuestions] = useState<ITestQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<IUserTestAnswer[]>([]);

  const [round, setRound] = useState<number>(1);
  const [points, setPoints] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const bonus = points > 0 ? points * 10 : 0;

  const isTraining = gameType === 'training';
  const questionAmount = isTraining ? TRAINING_QUESTIONS : GAME_QUESTIONS;
  const currentQuestion = isTraining ? questions[0] : questions[round - 1];

  const submitGame = isTraining ? submitTraining : submitTest;

  const fetchQuestions = async (amount: number) => {
    clearError();
    setIsLoading(true);

    try {
      const { data } = await getQuestions(amount);
      setQuestions(data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addUserAnswer = (answer: IUserTestAnswer) => {
    setUserAnswers([...userAnswers, answer]);
  };

  const addAnswerProfit = (profit: number) => {
    setPoints(points + profit);
  };

  const handleNextRound = () => {
    setRound(round + 1);

    if (gameType === 'training') {
      fetchQuestions(questionAmount);
    }
  };

  const handleSubmit = async () => {
    clearError();

    try {
      await submitGame(userAnswers);
      const gameResults: GameResultsInfo = { round, points, bonus, type: gameType };
      navigate('/results', { state: gameResults });
    } catch (error) {
      handleError(error);
    }
  };

  const handleTimerEnd = async () => {
    const duration = userAnswers.reduce((acc, { duration }) => acc + duration, TIME_PER_QUESTION);
    const results: IUserTraining | IUserTest = isTraining
      ? ({ rounds: round, duration } as IUserTraining)
      : ({ rounds: round, profit: points, duration } as IUserTest);

    await sendTimeout(isTraining, results);
    sendFailureReason(FailureReasons.Timeout);

    navigate('/end');
  };

  useEffect(() => {
    fetchQuestions(questionAmount);
  }, []);

  if (isLoading) return <CircularProgress />;

  if (!currentQuestion) return <ErrorDisplay />;

  return (
    <Box display='flex' flexDirection='column' alignItems='center' gap={3}>
      <GameRound
        key={round}
        isTraining={isTraining}
        round={round}
        points={points}
        bonus={bonus}
        totalRounds={isTraining ? round : GAME_QUESTIONS}
        question={currentQuestion}
        handleSubmit={handleSubmit}
        handleTimerEnd={handleTimerEnd}
        handleNextRound={handleNextRound}
        addUserAnswer={addUserAnswer}
        addAnswerProfit={addAnswerProfit}
      />
      <ErrorDisplay />
    </Box>
  );
}
