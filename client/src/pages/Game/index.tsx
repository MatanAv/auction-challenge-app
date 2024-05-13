import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useError } from '@/hooks/error';
import { useLoading } from '@/hooks/loading';
import { GameResultsInfo } from './GameResults';
import { IUserTest, IUserTraining } from '@/interfaces/user';
import { ITestQuestion, IUserTestAnswer } from '@/interfaces/tests';
import { getTrainingQuestions, getTestQuestions, sendTimeout, submitTest, submitTraining } from '@/api/tests';
import { TRAINING_MIN_ANSWERS, TIME_PER_QUESTION, GAME_ALERT_ROUND, BONUS_MULTIPLIER } from '@/constants/tests';

import Box from '@mui/material/Box';
import GameRound from '@/components/GameRound';

interface GameProps {
  gameType?: 'training' | 'game';
}

export default function Game({ gameType = 'game' }: GameProps) {
  const navigate = useNavigate();
  const { handleError, clearError, ErrorDisplay } = useError();
  const { loading, startLoading, stopLoading, LoadingDisplay } = useLoading();

  const [questions, setQuestions] = useState<ITestQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<IUserTestAnswer[]>([]);

  const [round, setRound] = useState<number>(1);
  const [points, setPoints] = useState<number>(0);

  const isTraining = gameType === 'training';
  const currentQuestion = isTraining ? questions[0] : questions[round - 1];

  const bonus = points > 0 ? points * BONUS_MULTIPLIER : 0;
  const totalRounds = !isTraining ? questions.length : round > TRAINING_MIN_ANSWERS ? round : TRAINING_MIN_ANSWERS;

  const submitGame = isTraining ? submitTraining : submitTest;

  const fetchQuestions = async () => {
    clearError();
    startLoading();

    try {
      const { data } = await (isTraining ? getTrainingQuestions() : getTestQuestions());
      setQuestions(data);
    } catch (error) {
      handleError(error);
    } finally {
      stopLoading();
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
      fetchQuestions();
    }
  };

  const handleSubmit = async () => {
    clearError();
    startLoading();

    try {
      await submitGame(userAnswers);
      const gameResults: GameResultsInfo = { round, points, bonus, type: gameType };
      navigate('/results', { state: gameResults });
    } catch (error) {
      handleError(error);
    } finally {
      stopLoading();
    }
  };

  const handleTimerEnd = async () => {
    const duration = userAnswers.reduce((acc, { duration }) => acc + duration, TIME_PER_QUESTION);
    const results: IUserTraining | IUserTest = isTraining
      ? ({ rounds: round, duration } as IUserTraining)
      : ({ rounds: round, profit: points, duration } as IUserTest);

    await sendTimeout(isTraining, results);
    navigate('/end');
  };

  useEffect(() => {
    if (!isTraining && round === GAME_ALERT_ROUND) {
      alert(`Everything's been going well so far! Just 6 questions left. Keep up the good work!`);
    }
  }, [round]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  if (loading) return <LoadingDisplay />;

  if (!currentQuestion) return <ErrorDisplay />;

  return (
    <Box display='flex' flexDirection='column' alignItems='center' gap={3}>
      <GameRound
        key={round}
        isTraining={isTraining}
        round={round}
        points={points}
        bonus={bonus}
        totalRounds={totalRounds}
        question={currentQuestion}
        handleSubmit={handleSubmit}
        handleTimerEnd={handleTimerEnd}
        handleNextRound={handleNextRound}
        addUserAnswer={addUserAnswer}
        addAnswerProfit={addAnswerProfit}
      />
      <LoadingDisplay />
      <ErrorDisplay />
    </Box>
  );
}
