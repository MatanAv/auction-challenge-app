import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ITestQuestion, IUserTestAnswer } from '@/interfaces/tests';
import { GAME_QUESTIONS, TRAINING_QUESTIONS } from '@/constants/tests';
import { getQuestions, submitTest, submitTraining } from '@/services/api/tests';
import type { GameResultsInfo } from './GameResults';

import Box from '@mui/material/Box';
import GameRound from '@/components/GameRound';
import CircularProgress from '@mui/material/CircularProgress';

interface GameProps {
  gameType?: 'training' | 'game';
}

export default function Game({ gameType = 'game' }: GameProps) {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<ITestQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<IUserTestAnswer[]>([]);

  const [round, setRound] = useState<number>(1);
  const [points, setPoints] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const bonus = points > 0 ? points * 10 : 0;

  const isTraining = gameType === 'training';
  const questionAmount = isTraining ? TRAINING_QUESTIONS : GAME_QUESTIONS;
  const currentQuestion = isTraining ? questions[0] : questions[round - 1];

  const fetchQuestions = async (amount: number) => {
    // TODO: handle error

    setIsLoading(true);

    const { data } = await getQuestions(amount);
    setQuestions(data);

    setIsLoading(false);
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
    // TODO: handle error

    const submitGame = isTraining ? submitTraining : submitTest;

    try {
      await submitGame(userAnswers);

      const gameResults: GameResultsInfo = { round, points, bonus, type: gameType };

      navigate('/results', { state: gameResults });
    } catch (error) {
      console.error(error);
    }
  };

  const handleTimerEnd = async () => {
    // TODO: fix this
    await handleSubmit();
    navigate('/');
  };

  useEffect(() => {
    fetchQuestions(questionAmount);
  }, []);

  if (isLoading) return <CircularProgress />;

  return (
    <Box>
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
    </Box>
  );
}
