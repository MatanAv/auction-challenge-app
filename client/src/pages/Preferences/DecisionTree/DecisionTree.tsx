import Button from '@mui/material/Button';
import styles from './DecisionTree.module.scss';

const NUM_ROUNDS = 5;

type DecisionTreeProps = {
    round: number;
    valueA: number;
    valueB: number;
    selectedValue: 'A' | 'B' | undefined;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const DecisionTree = (props: DecisionTreeProps) => {
    const { valueA, valueB } = props;
    return (
        <div>
            <h2>
                תרחיש {props.round} מתוך {NUM_ROUNDS}:
            </h2>

            <p>
                {valueA}$ היום, או {valueB}$ בעוד 12 חודשים?
            </p>

            <div className={styles.options_wrapper}>
                <Button
                    variant='outlined'
                    color='primary'
                    size='large'
                    disabled={props.selectedValue === 'A'}
                    onClick={props.onClick}
                    value='A'
                >
                    {valueA}$ היום
                </Button>

                <Button
                    variant='outlined'
                    color='primary'
                    size='large'
                    disabled={props.selectedValue === 'B'}
                    onClick={props.onClick}
                    value='B'
                >
                    {valueB}$ בעוד 12 חודשים
                </Button>
            </div>
        </div>
    );
};
