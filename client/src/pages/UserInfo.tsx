import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useError } from '@/hooks/error';
import { useLoading } from '@/hooks/loading';
import { IUserInfo } from '@/interfaces/user';
import { submitUserInfo } from '@/api/users';
import { countries } from '@/constants/countries';
import { Educations, Genders } from '@/enums/users';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SelectField from '@/components/Form/SelectField';

import { formStyle } from '@/styles';

const userFormStyle = {
  ...formStyle,
  '& > *': { width: 350 }
};

const MIN_AGE = 18;
const MAX_AGE = 99;

export default function UserInfo() {
  const navigate = useNavigate();
  const { handleError, clearError, ErrorDisplay } = useError();
  const { startLoading, stopLoading, LoadingDisplay } = useLoading();

  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState<string>('');
  const [education, setEducation] = useState<string>('');
  const [nationality, setNationality] = useState<string>('');

  const isAgeValueInvalid = !!age && (age < MIN_AGE || age > MAX_AGE);
  const isSubmitDisabled = age === null || age < MIN_AGE || age > MAX_AGE || !gender || !education || !nationality;

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(Number(e.target.value));
  };

  const handleSubmit = async () => {
    clearError();
    startLoading();

    try {
      const userInfo = { age, gender, education, nationality };
      await submitUserInfo(userInfo as IUserInfo);
      navigate('/instructions/game');
    } catch (error) {
      handleError(error);
    } finally {
      stopLoading();
    }
  };

  return (
    <Box sx={userFormStyle} component='form' noValidate autoComplete='off'>
      <Typography variant='h4' color='primary' fontWeight={700}>
        General Information
      </Typography>

      <Typography variant='body1' fontWeight={600}>
        Please provide the following information before starting the test:
      </Typography>

      <Box display='flex' flexDirection='column' gap={1}>
        <TextField
          label='Age'
          error={isAgeValueInvalid}
          inputProps={{ type: 'number', min: MIN_AGE, max: MAX_AGE }}
          onChange={handleAgeChange}
        />
        {isAgeValueInvalid && (
          <Typography variant='caption' color='error'>
            Age must be between {MIN_AGE} and {MAX_AGE}
          </Typography>
        )}
      </Box>

      <SelectField label='Gender' options={Object.values(Genders)} setValue={setGender} />
      <SelectField label='Education' options={Object.values(Educations)} setValue={setEducation} />
      <SelectField label='Nationality' options={countries} setValue={setNationality} />

      <Button
        variant='contained'
        color='primary'
        sx={{ maxWidth: 150 }}
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        Start Game
      </Button>

      <LoadingDisplay />
      <ErrorDisplay />
    </Box>
  );
}
