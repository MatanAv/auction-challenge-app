// import { shuffle } from 'lodash';
import { useCallback, useMemo, useRef, useState } from 'react';
import { NUM_PAGES, QUESTIONS_ORDER } from './Preferences.model';
import { pages } from './data/pages';
import { DecisionTree } from './DecisionTree/DecisionTree';
import { TableQuestion } from './TableQuestion/TableQuestion';

import Radio from '@mui/material/Radio';
import Slider from '@mui/material/Slider';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import styles from './Preferences.module.scss';

type Answer = {
    id: number;
    value: number | string;
};

export const Preferences = () => {
    const valueRef = useRef<number | undefined>();
    const pagesOrderRef = useRef<number[]>(QUESTIONS_ORDER);
    const [currentPage, setCurrentPage] = useState<number>(0);
    // const [currentSubPage, setCurrentSubPage] = useState<number>(0);
    const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
    const currentPageData = useMemo(() => pages[pagesOrderRef.current[currentPage]] || {}, [currentPage]);
    const { title, description, valueType, minValue, maxValue, options, decisionTreeMap } = currentPageData;

    const userInputValue = (userAnswers[currentPage - 1]?.value as number) || valueRef.current;

    const handleNext = useCallback(() => {
        if (valueRef.current !== undefined) {
            const answer: Answer = { id: currentPage, value: valueRef.current };

            valueRef.current = undefined; // Reset the value for the next page

            setUserAnswers((prev) => {
                const existingAnswerIndex = prev.findIndex((a) => a.id === answer.id);
                if (existingAnswerIndex !== -1) {
                    const updatedAnswers = [...prev];
                    updatedAnswers[existingAnswerIndex] = answer;
                    return updatedAnswers;
                }
                return [...prev, answer];
            });
        }
    }, [currentPage]);

    const renderQuestion = useCallback(() => {
        switch (valueType) {
            case 'slider':
                return (
                    <div>
                        <span>{minValue}</span>
                        <Slider
                            key={currentPage}
                            step={1}
                            min={minValue as number}
                            max={maxValue as number}
                            value={userInputValue}
                            valueLabelDisplay='on'
                            onChange={(_e, value) => (valueRef.current = Number(value))}
                        />
                        <span>{maxValue}</span>
                    </div>
                );
            case 'custom-rating':
                return (
                    <div>
                        <span>{minValue}</span>
                        <RadioGroup
                            row
                            key={currentPage}
                            value={userInputValue}
                            onChange={(_e, value) => (valueRef.current = Number(value))}
                        >
                            {options?.map((option) => (
                                <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
                            ))}
                        </RadioGroup>
                        <span>{maxValue}</span>
                    </div>
                );
            case 'table':
                return <TableQuestion onSubmit={() => {}} />;
            case 'rating':
                return (
                    <RadioGroup row key={currentPage} value={userInputValue} onChange={(_e, value) => (valueRef.current = Number(value))}>
                        {Array.from({ length: 11 }, (_, i) => (
                            <FormControlLabel key={i} value={i} control={<Radio />} label={i.toString()} />
                        ))}
                    </RadioGroup>
                );
            case 'decision-tree':
                return <DecisionTree round={0} value='' onClick={() => {}} decisionTreeMap={decisionTreeMap || {}} />;
            default:
                return null;
        }
    }, [valueType, minValue, currentPage, maxValue, userInputValue, options, decisionTreeMap]);

    // useEffect(() => {
    // pagesOrderRef.current = shuffle(pagesOrderRef.current);
    // }, []);

    return (
        <div className={styles.preferences_wrapper}>
            <h2>שאלון העדפות</h2>

            {currentPageData && (
                <>
                    {title && (
                        <h3>
                            שאלה {currentPage}: {title}
                        </h3>
                    )}

                    {description && <p>{description}</p>}

                    {renderQuestion()}
                </>
            )}

            <PreferencesNavigationBar currentPage={currentPage} onClickPrevious={() => {}} onClickNext={() => {}} />
        </div>
    );
};

type PreferencesNavigationBarProps = {
    onClickNext: () => void;
    onClickPrevious?: () => void;
    currentPage?: number;
};

const PreferencesNavigationBar = (props: PreferencesNavigationBarProps) => {
    return (
        <div className={styles.navigation_bar}>
            {props.onClickPrevious && <button onClick={props.onClickPrevious}>הקודם</button>}

            {!!props.currentPage && (
                <span className={styles.indicator}>
                    שאלה {props.currentPage} מתוך {NUM_PAGES}
                </span>
            )}

            <button onClick={props.onClickNext}>הבא</button>
        </div>
    );
};
