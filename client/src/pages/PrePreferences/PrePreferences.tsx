import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import styles from './PrePreferences.module.scss';

export const PrePreferences = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h2>שאלון העדפות</h2>

            <div className={styles.instructions}>
                <u>הוראות כלליות:</u>

                <ul>
                    <li>כעת תישאל סדרה של שאלות קצרות לגבי העדפותיך האישיות.</li>
                    <li>אין תשובות נכונות או שגויות, פשוט בחר את מה שמתאים בצורה הטובה ביותר לגישה האישית שלך.</li>
                    <li>לאחר השלמת חלק קצר זה, תעבור אוטומטית למשחק הראשי.</li>
                    <li>לחץ על כפתור "הבא" על מנת לעבור למסך השאלות.</li>
                </ul>
            </div>

            <Button size='large' variant='contained' onClick={() => navigate('/preferences')}>
                הבא
            </Button>
        </div>
    );
};
