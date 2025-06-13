import { useCallback } from 'react';
import styles from './MultiSlider.module.scss';

const MIN_VALUE = 0;
const MAX_VALUE = 100;

type MultiSliderProps = {
    round: number;
    value: number[];
    formId: string;
    onSubmit: (value: number[]) => void;
};

export const MultiSlider = (props: MultiSliderProps) => {
    const { round, value, onSubmit, formId } = props;
    const defaultValue = value[round] || 0;

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const inputValue = formData.get('input-number') as string;
            const newValue = [...value];
            newValue[round] = Number(inputValue);
            onSubmit(newValue);
        },
        [onSubmit, round, value]
    );

    return (
        <div className={styles.question_wrapper}>
            <div className={styles.question_content}>
                <h5>דמיינו לעצמכם את המצב הבא:</h5>
                {round === 0 && (
                    <p>
                        יחד עם אדם שאינכם מכירים זכיתם בהגרלה ב-100 דולר. הכללים קובעים את התנאים הבאים: אחד מכם צריך להציע כיצד לחלק את 100
                        הדולר ביניכם. השני נחשף להצעה וצריך להחליט בין שתי אפשרויות - הוא יכול לקבל את ההצעה או לדחות אותה. אם הוא מקבל את
                        ההצעה, הכסף מתחלק לפי ההצעה. אם הוא דוחה את ההצעה, שניכם לא מקבלים דבר.
                    </p>
                )}
            </div>

            {round === 0 ? (
                <p>אתם בתפקיד המציע! אנא ציינו את הסכום שהייתם מעוניינים לשלוח לאדם השני.</p>
            ) : (
                <p>אתם בתפקיד המחליט! אנא ציינו את הסכום המינימלי שאתם מוכנים לקבל.</p>
            )}

            <form id={formId} className={styles.slider_wrapper} onSubmit={handleSubmit}>
                <input
                    className={styles.slider_input}
                    name='input-number'
                    type='number'
                    placeholder={`${MIN_VALUE} - ${MAX_VALUE} $`}
                    defaultValue={defaultValue}
                    min={MIN_VALUE}
                    max={MAX_VALUE}
                    step={1}
                    required
                />
            </form>
        </div>
    );
};
