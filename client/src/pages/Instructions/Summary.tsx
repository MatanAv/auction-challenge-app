import { Parser } from 'html-to-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useError } from '@/hooks/error';
import { useLoading } from '@/hooks/loading';
import { FailureReasons } from '@/enums/users';
import { IUserInstructions } from '@/interfaces/user';
import { QUIZ_DURATION } from '@/constants/instructions';
import { sendFailureReason, submitUserInstructions } from '@/api/users';
import data from '@/data/training/quiz.json';

import Box from '@mui/material/Box';
import Timer from '@/components/Timer';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroupField from '@/components/Form/RadioGroupField';

import { listBoxStyle } from '@/styles';

const MIN_PASS_SCORE = 7;
const FAILS_LIMIT = 2;

interface SummaryResultsProps {
  score: number;
  setIsReview: (value: boolean) => void;
  handleRetakeTest: () => void;
}

function SummaryResults({ score, setIsReview, handleRetakeTest }: SummaryResultsProps) {
  const navigate = useNavigate();
  const fails = Number(window.sessionStorage.getItem('instructions_fails'));
  const isUserOverFailLimit = fails > FAILS_LIMIT;

  useEffect(() => {
    if (isUserOverFailLimit) {
      setTimeout(() => navigate('/end'), 5000);
    }
  }, [fails, isUserOverFailLimit, navigate]);

  return (
    <Box>
      <Typography variant='h4' fontWeight={600}>
        Summary Results
      </Typography>

      <Box sx={{ p: 3 }}>
        <Box my={3}>
          <Typography variant='body1' color='primary' mb={1} fontWeight={600}>
            Your score is: {`${score * 10}%`}.
          </Typography>
          <Typography variant='overline' fontWeight={500}>
            Passing score: {`${MIN_PASS_SCORE * 10}%`}.
          </Typography>
        </Box>

        <Divider />

        <Box my={3}>
          {score < MIN_PASS_SCORE ? (
            <>
              <Typography variant='h5' color='error' fontWeight={500}>
                You have failed the test.
              </Typography>

              <br></br>

              {!isUserOverFailLimit && (
                <Button variant='contained' onClick={handleRetakeTest}>
                  Retake Test
                </Button>
              )}
            </>
          ) : (
            <>
              <Typography variant='h5' color='green' fontWeight={500}>
                You have passed the test. Congratulations!
              </Typography>

              <br></br>

              <Button variant='outlined' color='primary' onClick={() => setIsReview(true)}>
                Review Test
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default function InstructionsSummary() {
  const navigate = useNavigate();
  const { handleError, clearError, ErrorDisplay } = useError();
  const { startLoading, stopLoading, LoadingDisplay } = useLoading();

  const [score, setScore] = useState(0);
  const [fails, setFails] = useState(Number(window.sessionStorage.getItem('instructions_fails')));
  const [startTime] = useState(Date.now());
  const [isReview, setIsReview] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const correctAnswers = useMemo(() => data.map(({ correct_answer }) => correct_answer), []);
  const isSubmitDisabled = hasSubmitted || userAnswers.filter((answer) => answer).length !== data.length;

  // useEffect(() => {
  //   window.sessionStorage.removeItem('is_navigating');
  // }, []);

  const getQuizSummary = (): IUserInstructions => {
    const summary: IUserInstructions = {
      score: 0,
      fails: fails,
      duration: Date.now() - startTime
    };

    userAnswers.forEach((answer, index) => answer === correctAnswers[index] && summary.score++);

    if (summary.score < MIN_PASS_SCORE) {
      summary.fails++;
      window.sessionStorage.setItem('instructions_fails', `${summary.fails}`);
    }

    setScore(summary.score);
    setFails(summary.fails);

    return summary;
  };

  const handleSubmit = async () => {
    clearError();
    startLoading();

    try {
      const quizSummary = getQuizSummary();
      await submitUserInstructions(quizSummary);

      if (quizSummary.fails > FAILS_LIMIT) {
        sendFailureReason(FailureReasons.SummaryQuiz);
      }

      setHasSubmitted(true);
    } catch (error) {
      handleError(error);
    } finally {
      stopLoading();
    }
  };

  const handleRetakeTest = () => {
    // window.sessionStorage.setItem('is_navigating', 'true');
    return navigate(0);
  };

  const handleTimerEnd = async () => {
    const quizSummary = getQuizSummary();
    await submitUserInstructions(quizSummary);
    sendFailureReason(FailureReasons.Timeout);
    return navigate('/end');
  };

  const renderQuestions = () => {
    return data.map(({ id, question, options }, index) => {
      const questionsOptionsTuple = Object.entries(options);
      const questionOptions = questionsOptionsTuple.map(([key, value]) => `${key}.  ${value}`);

      const renderedOptions = questionOptions.map((option) => {
        const isChecked = userAnswers[index] === option[0];
        const isCorrectAnswer = correctAnswers[index] === option[0];
        const optionStyle = hasSubmitted && isCorrectAnswer ? { color: 'green' } : {};

        return (
          <FormControlLabel
            sx={optionStyle}
            key={`${index}${option[0]}`}
            checked={isChecked}
            value={option[0]}
            label={option}
            control={<Radio />}
          />
        );
      });

      return (
        <Box key={id} sx={{ p: 1, textAlign: 'left' }}>
          <Typography variant='body1' color='primary' py={1} fontWeight={500}>
            {`${index + 1}.`} {Parser().parse(question)}
          </Typography>

          <RadioGroupField
            label={`${id}`}
            controlledOptions={renderedOptions}
            onChange={(value) => {
              if (hasSubmitted) return;
              const newAnswers = [...userAnswers];
              newAnswers[index] = value;
              setUserAnswers(newAnswers);
            }}
          />
        </Box>
      );
    });
  };

  return (
    <Box sx={{ ...listBoxStyle, alignItems: 'center' }}>
      {hasSubmitted && !isReview ? (
        <SummaryResults score={score} setIsReview={setIsReview} handleRetakeTest={handleRetakeTest} />
      ) : (
        <>
          <Typography variant='h4' fontWeight={600} color='red'>
            Summary Quiz
          </Typography>

          {!isReview && <Timer countTime={startTime + QUIZ_DURATION} onTimeEnd={handleTimerEnd} />}

          <Box sx={{ width: '80%', m: 'auto' }}>{renderQuestions()}</Box>

          {isReview ? (
            <Button
              variant='contained'
              color='primary'
              sx={{ mt: 2 }}
              onClick={() => navigate('/instructions/training')}
            >
              Go to Training
            </Button>
          ) : (
            <Button
              variant='contained'
              color='primary'
              sx={{ mt: 2 }}
              disabled={isSubmitDisabled}
              onClick={handleSubmit}
            >
              Submit Test
            </Button>
          )}
        </>
      )}
      <LoadingDisplay />
      <ErrorDisplay />
    </Box>
  );
}
