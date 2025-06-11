import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useError } from '@/hooks/error';
import { useLoading } from '@/hooks/loading';
import { IUserInfo } from '@/interfaces/user';
import { submitUserInfo } from '@/api/users';
import { genderToHebrewMap } from '@/enums/users';

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

    const [age, setAge] = useState<number>(0);
    const [gender, setGender] = useState<string>('');

    const isAgeValueInvalid = !!age && (age < MIN_AGE || age > MAX_AGE);
    const isSubmitDisabled = age === undefined || age < MIN_AGE || age > MAX_AGE || !gender;

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAge(Number(e.target.value));
    };

    const handleSubmit = async () => {
        clearError();
        startLoading();

        try {
            const userInfo: IUserInfo = { age, gender: genderToHebrewMap[gender] };
            await submitUserInfo(userInfo);
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
                פרטים אישיים
            </Typography>

            <Typography sx={{ direction: 'rtl' }} variant='body1' fontWeight={600}>
                אנא מלאו פרטים נוספים לפני שנתחיל:
            </Typography>

            <Box display='flex' flexDirection='column' gap={1}>
                <TextField
                    sx={{ direction: 'rtl' }}
                    label='גיל'
                    error={isAgeValueInvalid}
                    inputProps={{ type: 'number', min: MIN_AGE, max: MAX_AGE }}
                    onChange={handleAgeChange}
                />
                {isAgeValueInvalid && (
                    <Typography variant='caption' color='error'>
                        הגיל חייב להיות בין {MIN_AGE} ל {MAX_AGE}
                    </Typography>
                )}
            </Box>

            <SelectField label='מין' value={gender} options={Object.keys(genderToHebrewMap)} setValue={setGender} />

            <Button variant='contained' color='primary' sx={{ maxWidth: 150 }} onClick={handleSubmit} disabled={isSubmitDisabled}>
                התחל משחק
            </Button>

            <LoadingDisplay />
            <ErrorDisplay />
        </Box>
    );
}
