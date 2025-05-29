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

type QuestionId = number;

type AnswersMap = Record<QuestionId, string | number | number[]>;

type SubPageMap = Record<QuestionId, number>;

export const Preferences = () => {
    const valueRef = useRef<number | undefined>();
    const pagesOrderRef = useRef<number[]>(QUESTIONS_ORDER);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [currentSubPage, setCurrentSubPage] = useState<SubPageMap>({ 1: 1, 3: 1, 11: 1 });
    const [userAnswers, setUserAnswers] = useState<AnswersMap>([]);
    const questionId = pagesOrderRef.current[currentPage];
    const currentPageData = useMemo(() => pages[questionId] || {}, [questionId]);
    const { title, description, valueType, minValue, maxValue, options, decisionTreeMap, numOfSubPages } = currentPageData;

    const userInputValue = userAnswers[questionId] || valueRef.current;

    const handleOnClickNext = useCallback(() => {
        if (valueRef.current !== undefined) {
            const answerValue = valueRef.current;
            valueRef.current = undefined;
            setUserAnswers((prev) => ({ ...prev, [questionId]: answerValue }));

            // next page logic
            setCurrentPage((prev) => {
                const nextPage = prev + 1;
                if (nextPage >= NUM_PAGES) {
                    // navigate to results page or handle completion
                    console.log('All questions answered. Proceed to results.');
                    return prev; // stay on the last page
                }
                return nextPage;
            });
        }
    }, [questionId]);

    const onSliderChange = useCallback((_e: Event, value: number | number[]) => {
        valueRef.current = Number(value);
    }, []);

    const onRatingChange = useCallback((_e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        valueRef.current = Number(value);
    }, []);

    const onDecisionTreeClick = useCallback(
        (value: string) => {
            if (currentSubPage[questionId] === numOfSubPages) {
                valueRef.current = decisionTreeMap?.[value];
                handleOnClickNext(); // TODO: fix
            } else {
                setCurrentSubPage((prev) => ({ ...prev, [questionId]: (prev[questionId] || 1) + 1 }));
            }
        },
        [currentSubPage, decisionTreeMap, handleOnClickNext, numOfSubPages, questionId]
    );

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
                            value={userInputValue as number}
                            valueLabelDisplay='on'
                            onChange={onSliderChange}
                        />
                        <span>{maxValue}</span>
                    </div>
                );
            case 'custom-rating':
                return (
                    <div>
                        <span>{minValue}</span>
                        <RadioGroup row key={currentPage} value={userInputValue} onChange={onRatingChange}>
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
                    <RadioGroup row key={currentPage} value={userInputValue} onChange={onRatingChange}>
                        {Array.from({ length: 11 }, (_, i) => (
                            <FormControlLabel key={i} value={i} control={<Radio />} label={i.toString()} />
                        ))}
                    </RadioGroup>
                );
            case 'decision-tree':
                return <DecisionTree round={0} value='' onClick={onDecisionTreeClick} decisionTreeMap={decisionTreeMap || {}} />;
            default:
                return null;
        }
    }, [
        valueType,
        minValue,
        currentPage,
        maxValue,
        userInputValue,
        options,
        decisionTreeMap,
        onSliderChange,
        onRatingChange,
        onDecisionTreeClick
    ]);

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

            <PreferencesNavigationBar currentPage={currentPage} onClickPrevious={() => {}} onClickNext={handleOnClickNext} />
        </div>
    );
};

type PreferencesNavigationBarProps = {
    onClickNext: () => void;
    onClickPrevious?: () => void;
    currentPage?: number;
    disabled?: true;
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

            <button onClick={props.onClickNext} disabled={props.disabled}>
                הבא
            </button>
        </div>
    );
};
