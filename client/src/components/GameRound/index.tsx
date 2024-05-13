import { useState } from 'react';
import { AnswersValues } from '@/types/users';
import { TIME_PER_QUESTION } from '@/constants/tests';
import { ITestQuestion, IUserTestAnswer } from '@/interfaces/tests';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Timer from '@/components/Timer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Question from '@/components/GameRound/Question';
import ProgressBar from '@/components/GameRound/ProgressBar';
import QuestionResult from '@/components/GameRound/Question/QuestionResult';

import { listBoxStyle } from '@/styles';

const gridItemStyle = { display: 'flex', alignItems: 'flex-start', justifyContent: 'center' };

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
          totalRounds={totalRounds}
          isTraining={isTraining}
          handleNext={handleNextRound}
          handleSubmit={handleSubmit}
        />
      ) : (
        <>
          <Grid container spacing={10}>
            <Grid item xs={2} md={2} sx={gridItemStyle}>
              <ProgressBar round={round} points={points} bonus={bonus} totalRounds={totalRounds} />
            </Grid>
            <Grid item xs={8} md={8} sx={gridItemStyle}>
              <Box sx={{ ...listBoxStyle, alignItems: 'center' }}>
                <Typography variant='h4' color={'red'} fontWeight={500}>
                  Round {round}
                </Typography>
                <Question question={question} selectedOption={selectedOption} setSelected={setSelectedOption} />
              </Box>
            </Grid>
            <Grid item xs={2} md={2} sx={gridItemStyle}>
              <Timer key={round} countTime={startTime + TIME_PER_QUESTION} onTimeEnd={handleTimerEnd} />
            </Grid>
          </Grid>

          <Box display='flex' justifyContent='center'>
            <Button onClick={handleAnswerNext} disabled={!selectedOption} variant='contained' color='primary'>
              Submit Answer
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
