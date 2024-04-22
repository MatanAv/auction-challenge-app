import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SelectField from '@/components/Form/SelectField';

import { submitUserInfo } from '@/services/api/users';
import { getCountriesList } from '@/utils/countries';
import { Educations, Genders } from '@/enums/users';
import { UserInfo as IUserInfo } from '@/interfaces/user';

export default function UserInfo() {
  const navigate = useNavigate();

  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>('');
  const [education, setEducation] = useState<string>('');
  const [nationality, setNationality] = useState<string>('');

  const isSubmitDisabled = age < 1 || !gender || !education || !nationality;

  const memoizedCountriesField = useMemo(
    () => <SelectField label='Nationality' options={getCountriesList()} handleSelect={setNationality} />,
    []
  );

  const handleSubmit = async () => {
    try {
      const userInfo = {
        age,
        gender,
        education,
        nationality
      };

      console.log(userInfo);

      await submitUserInfo(userInfo as IUserInfo);

      navigate('/test');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      gap={5}
      component='form'
      noValidate
      autoComplete='off'
      sx={{ '& > *': { width: 350 } }}
    >
      <Typography variant='body1'>Please provide the following information before starting the test:</Typography>
      <TextField label='Age' type='number' error={age < 0} onChange={(e) => setAge(Number(e.target.value))} />
      <SelectField label='Gender' options={Object.values(Genders)} handleSelect={setGender} />
      <SelectField label='Education' options={Object.values(Educations)} handleSelect={setEducation} />
      {memoizedCountriesField}
      <Button
        variant='contained'
        color='primary'
        sx={{ maxWidth: 150 }}
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        Submit
      </Button>
    </Box>
  );
}
