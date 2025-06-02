import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useError } from '@/hooks/error';
import { registerUser } from '@/api/users';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { listBoxStyle } from '@/styles';

const UserRegister = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { handleError, clearError, ErrorDisplay } = useError();

    const [workerId, setWorkerId] = useState('');

    const handleRegister = async () => {
        clearError();
        setLoading(true);

        try {
            const response = await registerUser(workerId);

            window.sessionStorage.clear();
            window.sessionStorage.setItem('worker_id', response.data._id);

            navigate('/instructions');
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const onEnterDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleRegister();
        }
    };

    const handleWorkerIdChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (Number(value) > -1 && value.length < 10) {
            setWorkerId(value);
        }
    }, []);

    return (
        <Box display='flex' flexDirection='column' gap={3} component='form' noValidate autoComplete='off'>
            <TextField
                sx={{
                    direction: 'rtl',
                    'input::-webkit-outer-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0
                    },
                    'input::-webkit-inner-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0
                    }
                }}
                type='number'
                placeholder='תעודת זהות'
                value={workerId}
                onChange={handleWorkerIdChange}
                onKeyDown={onEnterDown}
                InputProps={{
                    startAdornment: (
                        <Button
                            sx={{ marginRight: 1 }}
                            variant='contained'
                            color='primary'
                            onClick={handleRegister}
                            disabled={workerId.length !== 9 || loading}
                        >
                            שלח
                        </Button>
                    )
                }}
            />

            {loading && <CircularProgress sx={{ margin: '0 auto' }} />}
            <ErrorDisplay />
        </Box>
    );
};

export default function Home() {
    return (
        <Box sx={{ ...listBoxStyle, direction: 'rtl' }}>
            <Typography variant='h5'>ברוכים הבאים!</Typography>
            <Typography variant='body1'>על מנת להתחיל, אנא הכנס את תעודת הזהות שלך:</Typography>
            <UserRegister />
        </Box>
    );
}
