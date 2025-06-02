// import { shuffle } from 'lodash';
import { useCallback, useMemo, useRef, useState } from 'react';
import { pages } from './data/pages';
import { NUM_PAGES, QUESTIONS_ORDER } from './Preferences.model';
import { MultiSlider } from './MultiSlider/MultiSlider';
import { DecisionTree } from './DecisionTree/DecisionTree';
import { TableQuestion } from './TableQuestion/TableQuestion';

import Radio from '@mui/material/Radio';
import Slider from '@mui/material/Slider';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import styles from './Preferences.module.scss';

type QuestionId = number;

type AnswerType = string | number | number[];

type AnswersMap = Record<QuestionId, AnswerType>;

type SubPageMap = Record<QuestionId, number>;

export const Preferences = () => {
    const pagesOrderRef = useRef<number[]>(QUESTIONS_ORDER);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [currentSubPage, setCurrentSubPage] = useState<SubPageMap>({ 1: 1, 3: 1, 11: 1 });
    const [currentValue, setCurrentValue] = useState<AnswerType | undefined>();
    const [userAnswers, setUserAnswers] = useState<AnswersMap>([]);
    const questionId = pagesOrderRef.current[currentPage];
    const currentRound = currentSubPage[questionId] - 1;
    const currentPageData = useMemo(() => pages[questionId] || {}, [questionId]);
    const { title, description, valueType, minValue, maxValue, options, decisionTreeMap = {}, numOfSubPages } = currentPageData;

    const userInputValue = userAnswers[questionId];
    const showPrevious = currentPage > 0 || currentSubPage[questionId] > 1;
    const isForm = valueType === 'table';

    const handleNextPage = useCallback(() => {
        setCurrentPage((prev) => {
            const nextPage = prev + 1;
            if (nextPage >= NUM_PAGES) {
                console.log('All questions answered. Proceed to results.');
                return prev;
            }
            return nextPage;
        });
    }, []);

    const onSliderChange = useCallback((_e: Event, value: number | number[]) => {
        setCurrentValue(Number(value));
    }, []);

    const onMultiSliderChange = useCallback((value: number[]) => {
        setCurrentValue(value);
    }, []);

    const onRatingChange = useCallback((_e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setCurrentValue(Number(value));
    }, []);

    const onDecisionTreeClick = useCallback((value: string) => {
        setCurrentValue(value);
    }, []);

    const onTableSubmit = useCallback(
        (value: number[]) => {
            setUserAnswers((prev) => ({ ...prev, [questionId]: value }));
            handleNextPage();
        },
        [handleNextPage, questionId]
    );

    const onNavigationClickPrevious = useCallback(() => {
        if (currentSubPage[questionId] > 1) {
            const previousSubPageValue = (userInputValue as string | number[])?.slice(0, currentRound);
            setCurrentValue(previousSubPageValue);
            setCurrentSubPage((prev) => ({ ...prev, [questionId]: prev[questionId] - 1 }));
        } else {
            setCurrentValue(userAnswers[questionId - 1]);
            setCurrentPage((prev) => prev - 1);
        }
    }, [currentRound, currentSubPage, questionId, userAnswers, userInputValue]);

    const onNavigationClickNext = useCallback(() => {
        if (currentValue !== undefined) {
            const answerValue = currentValue;
            setCurrentValue(undefined);
            setUserAnswers((prev) => ({ ...prev, [questionId]: answerValue }));

            if (currentSubPage[questionId] !== numOfSubPages) {
                setCurrentSubPage((prev) => ({ ...prev, [questionId]: prev[questionId] + 1 }));
            } else {
                handleNextPage();
            }
        }
    }, [currentSubPage, currentValue, handleNextPage, numOfSubPages, questionId]);

    const renderQuestion = useCallback(() => {
        switch (valueType) {
            case 'slider':
                return (
                    <>
                        <span>{minValue}</span>
                        <Slider
                            key={currentPage}
                            step={1}
                            min={minValue as number}
                            max={maxValue as number}
                            defaultValue={userInputValue as number}
                            valueLabelDisplay='on'
                            onChange={onSliderChange}
                        />
                        <span>{maxValue}</span>
                    </>
                );
            case 'multi-slider':
                return (
                    <MultiSlider
                        key={currentPage}
                        round={currentRound}
                        value={(userInputValue as number[]) || [0, 0]}
                        onSliderChange={onMultiSliderChange}
                    />
                );
            case 'custom-rating':
                return (
                    <>
                        <span>{minValue}</span>
                        <RadioGroup key={currentPage} row defaultValue={userInputValue} onChange={onRatingChange}>
                            {options?.map((option) => (
                                <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
                            ))}
                        </RadioGroup>
                        <span>{maxValue}</span>
                    </>
                );
            case 'table':
                return (
                    <TableQuestion
                        key={currentPage}
                        value={userInputValue ? (userInputValue as number[]) : undefined}
                        onSubmit={onTableSubmit}
                    />
                );
            case 'rating':
                return (
                    <RadioGroup key={currentPage} row defaultValue={userInputValue} onChange={onRatingChange}>
                        {Array.from({ length: 11 }, (_, i) => (
                            <FormControlLabel key={i} value={i} control={<Radio />} label={i.toString()} />
                        ))}
                    </RadioGroup>
                );
            case 'decision-tree':
                return (
                    <DecisionTree
                        key={currentPage}
                        round={currentRound}
                        value={typeof userInputValue === 'string' ? userInputValue : ''}
                        onClick={onDecisionTreeClick}
                        decisionTreeMap={decisionTreeMap}
                    />
                );
            default:
                return null;
        }
    }, [
        currentPage,
        currentRound,
        decisionTreeMap,
        maxValue,
        minValue,
        onDecisionTreeClick,
        onMultiSliderChange,
        onRatingChange,
        onSliderChange,
        onTableSubmit,
        options,
        userInputValue,
        valueType
    ]);

    // useEffect(() => {
    // pagesOrderRef.current = shuffle(pagesOrderRef.current);
    // }, []);

    return (
        <div className={styles.preferences_wrapper}>
            <h2>שאלון העדפות</h2>

            {currentPageData && (
                <>
                    <h3>
                        שאלה {currentPage + 1}: {title ?? ''}
                    </h3>

                    {description && <p>{description}</p>}

                    {renderQuestion()}

                    <PreferencesNavigationBar
                        currentPage={currentPage}
                        onClickPrevious={onNavigationClickPrevious}
                        onClickNext={onNavigationClickNext}
                        disabled={!isForm && currentValue === undefined}
                        showPrevious={showPrevious}
                        isForm={isForm}
                    />
                </>
            )}
        </div>
    );
};

type PreferencesNavigationBarProps = {
    currentPage: number;
    onClickNext: () => void;
    onClickPrevious: () => void;
    disabled?: boolean;
    showPrevious?: boolean;
    isForm?: boolean;
};

const PreferencesNavigationBar = (props: PreferencesNavigationBarProps) => {
    return (
        <div className={styles.navigation_bar}>
            {props.showPrevious && <button onClick={props.onClickPrevious}>הקודם</button>}

            <span className={styles.indicator}>
                שאלה {props.currentPage + 1} מתוך {NUM_PAGES}
            </span>

            {props.isForm ? (
                <button key={props.currentPage} form='table-form' type='submit' disabled={props.disabled}>
                    הבא
                </button>
            ) : (
                <button key={props.currentPage} onClick={props.onClickNext} disabled={props.disabled}>
                    הבא
                </button>
            )}
        </div>
    );
};
