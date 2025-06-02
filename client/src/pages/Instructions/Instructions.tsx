import { useNavigate } from 'react-router-dom';
import { TIME_PER_QUESTION } from '@/constants/tests';

import Box from '@mui/material/Box';
import Timer from '@/components/Timer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IntroSlides } from './IntroSlides/IntroSlides';

import { listBoxStyle } from '@/styles';

interface InstructionsProps {
    type?: 'training' | 'game';
}

export default function Instructions({ type }: InstructionsProps) {
    const navigate = useNavigate();

    if (!type) {
        return <IntroSlides />;
    }

    return (
        <Box sx={{ ...listBoxStyle, alignItems: 'center', gap: 3, direction: 'rtl' }}>
            <Typography variant='h4' color='red' fontWeight={500}>
                {type === 'training' ? 'סיבובי אימון - טרום ניסוי (לפחות 2 סיבובים)' : 'סיבובי משחק'}
            </Typography>
            {type === 'game' && (
                <Typography variant='h5' color='primary'>
                    כעת תשתתפו ב-15 סבבים שונים.
                </Typography>
            )}
            <Typography variant='body1'>
                לכל סיבוב מוקצות לכם 6 דקות (שהן מספיק זמן). אם לא תגיבו תוך 3 דקות, תקבלו אזהרה. אם לאחר שהוזהרתם לא תגיבו שוב, הניסוי
                יופסק ותאבדו את התגמול שלכם. הזמן הנותר (בשניות) לסיבוב הנוכחי מופיע במסגרת הירוקה.
            </Typography>

            <Typography variant='body2' fontWeight={500}>
                טיימר לדוגמא:
            </Typography>
            <Timer countTime={Date.now() + TIME_PER_QUESTION} />

            <Button variant='contained' onClick={() => navigate(`/${type}`)}>
                התחל {type === 'training' ? 'תרגול' : 'משחק'}
            </Button>
        </Box>
    );
}
