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
    const buttonBText = isQuestion1 ? `${valueB}$ היום` : Q3_B_BUTTON_TEXT;

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
        <div>
            <h5>
                תרחיש {round + 1} מתוך {NUM_ROUNDS}:
            </h5>

            <p>{isQuestion1 ? '' : `100$ היום, או ${valueA}$ בעוד 12 חודשים?`}</p>

            <div className={styles.options_wrapper}>
                <Button
                    variant={selectedOption === 'B' ? 'contained' : 'outlined'}
                    color='primary'
                    size='large'
                    onClick={handleOnClick}
                    value='B'
                >
                    {buttonBText}
                </Button>

                <Button
                    variant={selectedOption === 'A' ? 'contained' : 'outlined'}
                    color='primary'
                    size='large'
                    onClick={handleOnClick}
                    value='A'
                >
                    {buttonAText}
                </Button>
            </div>
        </div>
    );
};
