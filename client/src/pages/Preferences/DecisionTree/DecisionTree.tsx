import { isEmpty } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { DecisionTreeMap } from '../data/decision-tree';

import Button from '@mui/material/Button';
import styles from './DecisionTree.module.scss';

const NUM_ROUNDS = 5;
const Q1_A_BUTTON_TEXT = '50% לזכות ב-300$';
const Q3_B_BUTTON_TEXT = '100$ היום';

type DecisionTreeProps = {
    value: string;
    round: number;
    decisionTreeMap: DecisionTreeMap;
    onClick: (value: string) => void;
};

export const DecisionTree = (props: DecisionTreeProps) => {
    const { value, round, decisionTreeMap, onClick } = props;
    const [selectedOption, setSelectedOption] = useState<'A' | 'B' | undefined>(value[round] as 'A' | 'B' | undefined);
    const valueWithoutRound = value.slice(0, round);

    const isQuestion1 = decisionTreeMap[''] === 160;

    const valueA = isQuestion1 ? decisionTreeMap[valueWithoutRound + 'A'] : decisionTreeMap[valueWithoutRound];
    const valueB = isQuestion1 ? decisionTreeMap[valueWithoutRound] : decisionTreeMap[valueWithoutRound + 'B'];

    const buttonAText = isQuestion1 ? Q1_A_BUTTON_TEXT : `${valueA}$ בעוד 12 חודשים`;
    const buttonBText = isQuestion1 ? `${valueB}$` : Q3_B_BUTTON_TEXT;

    const handleOnClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            const newValue = event.currentTarget.value as 'A' | 'B';
            setSelectedOption(newValue);
            onClick(valueWithoutRound + newValue);
        },
        [onClick, valueWithoutRound]
    );

    useEffect(() => {
        setSelectedOption(value[round] as 'A' | 'B' | undefined);
    }, [round, value]);

    if (isEmpty(decisionTreeMap) || round >= NUM_ROUNDS) {
        return null;
    }

    return (
        <div className={styles.decision_tree_wrapper}>
            {isQuestion1 ? <Question1Description /> : <Question3Description />}

            <div className={styles.round_wrapper}>
                <h5 className={styles.round_title}>
                    תרחיש {round + 1} מתוך {NUM_ROUNDS}:
                </h5>

                <div className={styles.question_wrapper}>
                    <u>מה הייתם מעדיפים:</u>

                    {isQuestion1 ? (
                        <p>
                            {`סיכוי של 50 אחוז לזכות ב-300$ כאשר במקביל יש סיכוי של 50 אחוז שלא לזכות בכלום, או שהייתם מעדיפים לקבל סכום של ${valueB}$ כתשלום בטוח.`}
                        </p>
                    ) : (
                        <p>100$ היום, או {valueA}$ בעוד 12 חודשים?</p>
                    )}
                </div>

                <div className={styles.options_wrapper}>
                    <Button
                        variant={selectedOption === 'B' ? 'contained' : 'outlined'}
                        color='primary'
                        size='large'
                        onClick={handleOnClick}
                        value='B'
                        sx={{ width: '150px', height: '70px' }}
                    >
                        {buttonBText}
                    </Button>

                    <Button
                        variant={selectedOption === 'A' ? 'contained' : 'outlined'}
                        color='primary'
                        size='large'
                        onClick={handleOnClick}
                        value='A'
                        sx={{ width: '150px', height: '70px' }}
                    >
                        {buttonAText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

const Question1Description = () => (
    <div className={styles.question_description}>
        <h5>דמיינו את המצב הבא:</h5>
        <p>
            ניתן לבחור בין תשלום בטוח כלשהו לבין הגרלה. ההגרלה נותנת לך סיכוי של 50 אחוז לקבל 300$, עם סיכוי זהה שלא לקבל כלום. עכשיו דמיינו
            שהייתם צריכים לבחור בין הגרלה לבין תשלום בטוח. נציג בפניכם 5 מצבים שונים. סכום ההגרלה זהה בכל המצבים. התשלום הוודאי שונה בכל
            מצב.
        </p>
    </div>
);

const Question3Description = () => (
    <div className={styles.question_description}>
        <h5>כעת נציג בפניכם 5 מצבים:</h5>
        <p>
            נניח שניתנה לך לבחור האפשרות בין קבלת תשלום היום או תשלום בעוד 12 חודשים. התשלום היום זהה בכל אחד מהמצבים הללו. התשלום בעוד 12
            חודשים שונה בכל מצב. עבור כל אחד מהמצבים הללו נרצה לדעת באיזה אפשרות תבחרו. אנא הניחו שאין אינפלציה, כלומר המחירים העתידיים זהים
            למחירים של היום.
        </p>
    </div>
);
