import { useCallback } from 'react';
import styles from './MultiInputNumber.module.scss';

const MIN_VALUE = 0;
const MAX_VALUE = 100;

type MultiInputNumberProps = {
    round: number;
    value: number[];
    formId: string;
    onSubmit: (value: number[]) => void;
};

export const MultiInputNumber = (props: MultiInputNumberProps) => {
    const { round, value, onSubmit, formId } = props;

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

            <form id={formId} className={styles.input_number_wrapper} onSubmit={handleSubmit}>
                <input
                    className={styles.input_number}
                    name='input-number'
                    type='number'
                    placeholder={`${MIN_VALUE} - ${MAX_VALUE} $`}
                    defaultValue={value[round]}
                    min={MIN_VALUE}
                    max={MAX_VALUE}
                    step={1}
                    required
                />
            </form>
        </div>
    );
};
