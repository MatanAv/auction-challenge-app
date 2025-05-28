import { isEmpty } from 'lodash';
import { useCallback, useState } from 'react';
import { DecisionTreeMap } from '../data/decision-tree';

import Button from '@mui/material/Button';
import styles from './DecisionTree.module.scss';

const NUM_ROUNDS = 5;

type DecisionTreeProps = {
    value: string;
    round: number;
    decisionTreeMap: DecisionTreeMap;
    onClick: (value: string) => void;
};

export const DecisionTree = (props: DecisionTreeProps) => {
    const { value, round, decisionTreeMap, onClick } = props;
    const [selectedOption, setSelectedOption] = useState<'A' | 'B' | undefined>();

    const valueA = decisionTreeMap[value + 'A'];
    const valueB = decisionTreeMap[value + 'B'];

    const handleOnClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            const newValue = event.currentTarget.value as 'A' | 'B';
            setSelectedOption(newValue);
            onClick(value + newValue);
        },
        [onClick, value]
    );

    if (isEmpty(decisionTreeMap) || round >= NUM_ROUNDS) {
        return null;
    }

    return (
        <div>
            <h2>
                תרחיש {round + 1} מתוך {NUM_ROUNDS}:
            </h2>

            <p>
                {valueB}$ היום, או {valueA}$ בעוד 12 חודשים?
            </p>

            <div className={styles.options_wrapper}>
                <Button variant='outlined' color='primary' size='large' disabled={selectedOption === 'A'} onClick={handleOnClick} value='A'>
                    {valueB}$ היום
                </Button>

                <Button variant='outlined' color='primary' size='large' disabled={selectedOption === 'B'} onClick={handleOnClick} value='B'>
                    {valueA}$ בעוד 12 חודשים
                </Button>
            </div>
        </div>
    );
};
