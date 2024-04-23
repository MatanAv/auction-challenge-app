import { useState } from 'react';
import { submitSurvey } from '@/services/api/survey';
import { SurveyAnswers } from '@/interfaces/survey';
import { surveyQuestions } from '@/constants/survey';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import RadioGroupField from '@/components/Form/RadioGroupField';

import { formStyle } from '@/styles';

const surveyBoxStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  gap: 3,
  p: 2,
  '& *': {
    fontSize: '0.975rem !important'
  }
};

export default function Survey() {
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    try {
      const userSurvey = {
        q1,
        q2,
        q3,
        comment
      };

      console.log(userSurvey);

      await submitSurvey(userSurvey as SurveyAnswers);
    } catch (error) {
      // TODO: handle error
      console.error(error);
    }
  };

  return (
    <Box
      sx={{ ...formStyle, gap: 2.5, width: '60%', textAlign: 'left' }}
      component='form'
      noValidate
      autoComplete='off'
    >
      <Typography variant='body1' fontWeight={600}>
        Please answer this short survey:
      </Typography>

      <Box sx={surveyBoxStyle}>
        {surveyQuestions.map((question) => {
          const setFunction = question.id === 'q1' ? setQ1 : question.id === 'q2' ? setQ2 : setQ3;
          return (
            <Box key={question.id}>
              <Typography variant='body1' color='darkorange' fontWeight={500} mb={1}>
                {question.title}
              </Typography>
              <RadioGroupField label={question.id} options={question.options} setValue={setFunction} />
            </Box>
          );
        })}

        <Box sx={{ width: '100%' }}>
          <Typography variant='body1' color='darkorange' fontWeight={500} mb={2.5}>
            Do you have any comment?
          </Typography>
          <TextField label='Comment' fullWidth defaultValue='' onChange={(e) => setComment(e.target.value)} />
        </Box>
      </Box>

      <Button sx={{ width: 300 }} variant='contained' color='primary' onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}
