import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useError } from '@/hooks/error';
import { registerUser } from '@/api/users';

import CircularProgress from '@mui/material/CircularProgress';

import styles from './Home.module.scss';

const HE_EN_FULL_NAME_PATTERN = '^[א-תa-zA-Z]+ [א-תa-zA-Z\\s]{2,}$';
const ISRAELI_ID_PATTERN = '^[0-9]{9}$';
const FORMATTED_DATE = new Date().toLocaleDateString('he-IL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
});

const UserRegister = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { handleError, clearError, ErrorDisplay } = useError();

    const handleRegister = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            clearError();
            setLoading(true);

            const formData = new FormData(event.currentTarget);
            const fullName = formData.get('full_name') as string;
            const workerId = formData.get('worker_id') as string;

            try {
                const response = await registerUser(workerId, fullName);
                window.sessionStorage.clear();
                window.sessionStorage.setItem('worker_id', response.data._id);
                navigate('/instructions');
            } catch (error) {
                handleError(error);
            } finally {
                setLoading(false);
            }
        },
        [clearError, handleError, navigate]
    );

    return (
        <>
            <form className={styles.form} onSubmit={handleRegister}>
                <label htmlFor='approval'>
                    <input type='checkbox' name='approval' required />
                    הנני מאשר האמור לעיל.
                </label>

                <label htmlFor='full_name'>
                    שם מלא:
                    <input type='text' name='full_name' minLength={3} pattern={HE_EN_FULL_NAME_PATTERN} required />
                </label>

                <label htmlFor='worker_id'>
                    תעודת זהות:
                    <input type='text' name='worker_id' maxLength={9} minLength={9} pattern={ISRAELI_ID_PATTERN} required />
                </label>

                <label>
                    תאריך:
                    <input type='text' value={FORMATTED_DATE} disabled />
                </label>

                <button type='submit' disabled={loading}>
                    הרשם
                </button>
            </form>

            <div>
                {loading && <CircularProgress sx={{ margin: '0 auto' }} />}
                <ErrorDisplay />
            </div>
        </>
    );
};

const Terms = () => {
    return (
        <div className={styles.terms}>
            <h6 className={styles.terms_subtitle}>הטופס מנוסח בלשון זכר מטעמי נוחות בלבד אך מיועד לשני המינים.</h6>

            <p>שלום רב, מוצע לך להשתתף במחקר שנערך במסגרת אוניברסיטת אריאל, תחת אחריותה של ד"ר שני אלקובי, מהמחלקה להנדסת תעשייה וניהול.</p>

            <div className={styles.terms_section}>
                <u>תיאור כללי של המחקר:</u>
                <p>
                    מחקר זה עוסק בחקר תהליכי קבלת החלטות של בני אדם במצבי בחירה מורכבים, המדמים סביבה של מכרזים מסוג "מחיר שני". מטרת המחקר
                    היא לבחון כיצד ניתן לחזות את העדפותיך ובחירותיך במצבים אלו, בהתבסס על מאפיינים אישיים ודפוסי התנהגות שייאספו במהלך
                    הניסוי.
                </p>
            </div>

            <div className={styles.terms_section}>
                <u>מבנה הניסוי:</u>
                <p>הניסוי מורכב משני שלבים:</p>
                <div>
                    <ol>
                        <li>שלב מקדים – שאלון אישיותי: שאלון קצר הכולל סדרת שאלות העוסקות בהעדפותיך במצבי סיכון ובאי ודאות.</li>
                        <li>
                            שלב עיקרי – משימות בחירה: סדרת סבבים בהם תתבקש לבחור בין שני מכרזים, שכל אחד מהם כולל מידע על תנאי המכרז
                            והסיכון/הרווח הצפוי בו.
                        </li>
                    </ol>
                </div>
            </div>

            <div className={styles.terms_section}>
                <u>משך ההשתתפות:</u>
                <p>כ-90 דקות בסך הכול.</p>
            </div>

            <div className={styles.terms_section}>
                <u>אופי ההשתתפות:</u>
                <div>
                    <ul>
                        <li>השתתפותך בניסוי היא בהתנדבות מלאה.</li>
                        <li>תוכל להפסיק את השתתפותך בכל שלב וללא צורך בנימוק.</li>
                        <li>הבחירה שלא להשתתף או לפרוש מהניסוי לא תפגע בציוניך או במעמדך האקדמי.</li>
                    </ul>
                </div>
            </div>

            <div className={styles.terms_section}>
                <u>תמורה:</u>
                <p>המשתתפים יקבלו נקודות בונוס בקורס כתלות בהשלמת הניסוי ובביצועיהם.</p>
            </div>

            <div className={styles.terms_section}>
                <u>שמירה על פרטיות וסודיות:</u>
                <ul>
                    <li>כל הנתונים שייאספו יהיו אנונימיים לחלוטין.</li>
                    <li>בתחילת הניסוי תתבקש להזין את מספר תעודת הזהות שלך לצורך שיוך בונוס בלבד.</li>
                    <li>לאחר ההזדהות, יינתן לך מספר משתמש אקראי, ונתוניך ישויכו למספר זה בלבד.</li>
                    <li>הקישור בין תעודת הזהות למספר המשתמש ישמר בנפרד וישמש אך ורק למתן התגמול.</li>
                </ul>
            </div>

            <div className={styles.terms_section}>
                <u>סיכונים ואי-נוחות:</u>
                <p>הניסוי אינו צפוי לגרום לאי נוחות או לסיכון כלשהו. מדובר במשימות סימולציה ממוחשבות בלבד.</p>
            </div>

            <div className={styles.terms_section}>
                <u>פנייה בשאלות או הסתייגויות:</u>
                <p>בכל שאלה ניתן לפנות לעוזר המחקר אביעד לוי aviad.levi3@msmail.ariel.ac.il</p>
            </div>

            <div className={styles.terms_section}>
                <u>הצהרת משתתף:</u>
                <p>אני החתום מטה מצהיר בזאת כי:</p>
                <ul>
                    <li>קראתי והבנתי את המידע המופיע לעיל.</li>
                    <li>ניתנה לי האפשרות לשאול שאלות ולקבל הבהרות ככל שנדרש.</li>
                    <li>אני מסכים להשתתף בניסוי ומבין כי באפשרותי להפסיק את השתתפותי בכל שלב.</li>
                </ul>
            </div>
        </div>
    );
};

export default function Home() {
    return (
        <div className={styles.home_wrapper}>
            <h3>טופס הסכמה להשתתפות בניסוי</h3>
            <Terms />
            <UserRegister />
        </div>
    );
}
