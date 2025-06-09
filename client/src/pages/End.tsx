import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logoutUser } from '@/api/users';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { listBoxStyle } from '@/styles';

export default function End() {
    const location = useLocation();
    const approvalKey = location.state?.approval_key;

    useEffect(() => {
        logoutUser().finally(() => window.sessionStorage.clear());
    }, []);

    return (
        <Box sx={{ ...listBoxStyle, direction: 'rtl', gap: 5 }}>
            <Typography variant='h3' fontWeight={800} color='green'>
                המשחק הסתיים
            </Typography>
            {!approvalKey && (
                <Typography variant='h4' color='error'>
                    נכשלת במשחק.
                </Typography>
            )}
            <Typography variant='h6'>תודה על השתתפותך במשחק!</Typography>
        </Box>
    );
}
