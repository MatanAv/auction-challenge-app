import { useState } from 'react';
import { AnswersValues } from '@/types/users';
import { TIME_PER_QUESTION } from '@/constants/tests';
import { ITestQuestion, IUserTestAnswer } from '@/interfaces/tests';

import Box from '@mui/material/Box';
import Timer from '@/components/Timer';
import Button from '@mui/material/Button';
import Question from '@/components/GameRound/Question/Question';
import ProgressBar from '@/components/GameRound/ProgressBar';
import QuestionResult from '@/components/GameRound/Question/QuestionResult';

import { listBoxStyle } from '@/styles';

const testBoxStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 3
};

interface GameRoundProps {
  isTraining: boolean;
  round: number;
  points: number;
  bonus: number;
  totalRounds: number;
  question: ITestQuestion;
  handleNextRound: () => void;
  handleSubmit: () => Promise<void>;
  handleTimerEnd: () => Promise<void>;
  addUserAnswer: (answer: IUserTestAnswer) => void;
  addAnswerProfit: (profit: number) => void;
}

export default function GameRound({
  isTraining,
  round,
  points,
  bonus,
  question,
  totalRounds,
  handleSubmit,
  handleTimerEnd,
  handleNextRound,
  addUserAnswer,
  addAnswerProfit
}: GameRoundProps) {
  const [isResultView, setIsResultView] = useState<boolean>(false);

  const [startTime] = useState<number>(Date.now());
  const [selectedOption, setSelectedOption] = useState<AnswersValues | null>(null);

  const handleAnswerNext = () => {
    const userAnswer: IUserTestAnswer = {
      worker: window.sessionStorage.getItem('worker_id') || '',
      question: question._id,
      is_training: isTraining,
      answer: selectedOption as AnswersValues,
      round,
      profit: question[`profit_${selectedOption}` as keyof ITestQuestion] as number,
      duration: Date.now() - startTime
    };

    addUserAnswer(userAnswer);
    addAnswerProfit(userAnswer.profit);
    setIsResultView(true);
  };

  return (
    <Box sx={{ ...listBoxStyle, gap: 10 }}>
      {isResultView ? (
        <QuestionResult
          question={question}
          selectedOption={selectedOption!}
          round={round}
          isTraining={isTraining}
          handleNext={handleNextRound}
          handleSubmit={handleSubmit}
        />
      ) : (
        <>
          <Box sx={testBoxStyle}>
            <ProgressBar round={round} points={points} bonus={bonus} totalRounds={totalRounds} />

            <Box sx={{ ...listBoxStyle, alignItems: 'center' }}>
              <Question question={question} selectedOption={selectedOption} setSelected={setSelectedOption} />
            </Box>

            <Timer key={round} countTime={startTime + TIME_PER_QUESTION} onTimeEnd={handleTimerEnd} />
          </Box>

          <Box display='flex' justifyContent='center'>
            <Button onClick={handleAnswerNext} disabled={!selectedOption} variant='contained' color='primary'>
              Next Question
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
