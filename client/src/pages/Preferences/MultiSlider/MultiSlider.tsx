import { useCallback } from 'react';
import Slider from '@mui/material/Slider';
import styles from './MultiSlider.module.scss';

const MIN_VALUE = 0;
const MAX_VALUE = 100;

type MultiSliderProps = {
    round: number;
    value: number[];
    onSliderChange: (value: number[]) => void;
};

export const MultiSlider = (props: MultiSliderProps) => {
    const { round, value, onSliderChange } = props;

    const handleOnSliderChange = useCallback(
        (_event: Event, sliderValue: number | number[]) => {
            const newValue = [...value];
            newValue[round] = sliderValue as number;
            onSliderChange(newValue);
        },
        [onSliderChange, round, value]
    );

    return (
        <div className={styles.question_wrapper}>
            {round === 0 && (
                <p>
                    יחד עם אדם שאינכם מכירים זכיתם בהגרלה ב-100 דולר. הכללים קובעים את התנאים הבאים: אחד מכם צריך להציע כיצד לחלק את 100
                    הדולר ביניכם. השני נחשף להצעה וצריך להחליט בין שתי אפשרויות - הוא יכול לקבל את ההצעה או לדחות אותה. אם הוא מקבל את
                    ההצעה, הכסף מתחלק לפי ההצעה. אם הוא דוחה את ההצעה, שניכם לא מקבלים דבר.
                </p>
            )}

            {round === 0 ? (
                <p>אתם בתפקיד המציע! אנא ציינו את הסכום שהייתם מעוניינים לשלוח לאדם השני.</p>
            ) : (
                <p>אתם בתפקיד המחליט! אנא ציינו את הסכום המינימלי שאתם מוכנים לקבל.</p>
            )}

            <div className={styles.slider_wrapper}>
                <span>{MAX_VALUE}$</span>
                <Slider
                    key={round}
                    step={1}
                    min={MIN_VALUE}
                    max={MAX_VALUE}
                    defaultValue={value[round]}
                    onChange={handleOnSliderChange}
                    valueLabelDisplay='on'
                    sx={{ width: '500px' }}
                />
                <span>{MIN_VALUE}$</span>
            </div>
        </div>
    );
};
