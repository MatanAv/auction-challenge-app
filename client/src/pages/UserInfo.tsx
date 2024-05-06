import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useError } from '@/hooks/error';
import { useLoading } from '@/hooks/loading';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SelectField from '@/components/Form/SelectField';

import { IUserInfo } from '@/interfaces/user';
import { submitUserInfo } from '@/api/users';
import { getCountriesList } from '@/utils/countries';
import { Educations, Genders } from '@/enums/users';

import { formStyle } from '@/styles';

const userFormStyle = {
  ...formStyle,
  '& > *': { width: 350 }
};

const MIN_AGE = 18;

export default function UserInfo() {
  const navigate = useNavigate();
  const { handleError, clearError, ErrorDisplay } = useError();
  const { startLoading, stopLoading, LoadingDisplay } = useLoading();

  const [age, setAge] = useState<number>(MIN_AGE);
  const [gender, setGender] = useState<string>('');
  const [education, setEducation] = useState<string>('');
  const [nationality, setNationality] = useState<string>('');

  const isSubmitDisabled = age < MIN_AGE || !gender || !education || !nationality;

  const memoizedCountriesField = useMemo(
    () => <SelectField label='Nationality' options={getCountriesList()} setValue={setNationality} />,
    []
  );

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const age = Number(e.target.value);
    if (age < MIN_AGE) {
      setAge(MIN_AGE);
    } else {
      setAge(age);
    }
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

      <TextField label='Age' type='number' onChange={handleAgeChange} />
      <SelectField label='Gender' options={Object.values(Genders)} setValue={setGender} />
      <SelectField label='Education' options={Object.values(Educations)} setValue={setEducation} />
      {memoizedCountriesField}

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
