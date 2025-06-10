// import { shuffle } from 'lodash';
import { Parser } from 'html-to-react';
import { useNavigate } from 'react-router-dom';
import { useCallback, useRef, useState } from 'react';
import { pages } from './data/pages';
import { submitPreferences } from '@/api/preferences';
import { NUM_PAGES, QUESTIONS_ORDER } from './Preferences.model';
import { MultiSlider } from './MultiSlider/MultiSlider';
import { DecisionTree } from './DecisionTree/DecisionTree';
import { TableQuestion } from './TableQuestion/TableQuestion';

import Radio from '@mui/material/Radio';
import Slider from '@mui/material/Slider';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import cn from 'classnames';
import styles from './Preferences.module.scss';

type QuestionId = number;

type AnswerType = string | number | number[];

type SubPageMap = Record<QuestionId, number>;

export type AnswersMap = Record<QuestionId, AnswerType>;

export const Preferences = () => {
    const navigate = useNavigate();
    // const pagesOrderRef = useRef<number[]>(shuffle(QUESTIONS_ORDER));
    const pagesOrderRef = useRef<number[]>(QUESTIONS_ORDER);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [currentSubPage, setCurrentSubPage] = useState<SubPageMap>({ 1: 1, 3: 1, 11: 1 });
    const [currentValue, setCurrentValue] = useState<AnswerType | undefined>();
    const [userAnswers, setUserAnswers] = useState<AnswersMap>([]);
    const questionId = pagesOrderRef.current[currentPage];
    const currentRound = currentSubPage[questionId] - 1;
    const currentPageData = pages[questionId];
    const { title, description, valueType, minValue, maxValue, options, decisionTreeMap = {}, numOfSubPages } = currentPageData;

    const currentUserAnswer = userAnswers[questionId];
    const isForm = valueType === 'table';
    const nextDisabled = !isForm && currentValue === undefined;
    const prevDisabled = !(currentPage > 0 || currentSubPage[questionId] > 1);

    const onNavigationClickPrevious = useCallback(() => {
        if (currentSubPage[questionId] > 1) {
            setCurrentValue(userAnswers[questionId]);
            setCurrentSubPage((prev) => ({ ...prev, [questionId]: prev[questionId] - 1 }));
        } else if (currentPage > 0) {
            const previousPageQuestionId = pagesOrderRef.current[currentPage - 1];
            setCurrentValue(userAnswers[previousPageQuestionId]);
            setCurrentPage((prev) => prev - 1);
        } else {
            navigate('/intro/preferences');
        }
    }, [currentPage, currentSubPage, navigate, questionId, userAnswers]);

    const onNavigationClickNext = useCallback(
        (value?: AnswerType) => {
            const answerValue = currentValue !== undefined ? currentValue : value;
            const isLastSubPage = currentSubPage[questionId] === numOfSubPages;
            const nextPageQuestionId = pagesOrderRef.current[currentPage + 1];

            const nextCurrentValue = isLastSubPage
                ? userAnswers[nextPageQuestionId]
                : (userAnswers[questionId] as string | number[])?.[currentRound] === (currentValue as string | number[])?.[currentRound]
                ? userAnswers[questionId]
                : undefined;

            setCurrentValue(nextCurrentValue);

            if (answerValue !== undefined) {
                const newUserAnswers = { ...userAnswers, [questionId]: answerValue };
                setUserAnswers((prev) => ({ ...prev, [questionId]: answerValue }));

                if (currentSubPage[questionId] !== numOfSubPages) {
                    setCurrentSubPage((prev) => ({ ...prev, [questionId]: prev[questionId] + 1 }));
                } else if (currentPage < NUM_PAGES - 1) {
                    setCurrentPage((prev) => prev + 1);
                } else {
                    submitPreferences(newUserAnswers);
                    navigate('/instructions/training');
                }
            }
        },
        [currentPage, currentRound, currentSubPage, currentValue, navigate, numOfSubPages, questionId, userAnswers]
    );

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

    const renderQuestion = useCallback(() => {
        switch (valueType) {
            case 'slider':
                return (
                    <div className={styles.slider_wrapper} key={currentPage}>
                        <span>{maxValue}$</span>
                        <Slider
                            key={currentPage}
                            step={1}
                            min={minValue as number}
                            max={maxValue as number}
                            defaultValue={currentUserAnswer as number}
                            valueLabelDisplay='on'
                            onChange={onSliderChange}
                            sx={{ width: '500px' }}
                        />
                        <span>{minValue}$</span>
                    </div>
                );
            case 'multi-slider':
                return (
                    <MultiSlider
                        key={`${currentPage}-${currentRound}`}
                        round={currentRound}
                        value={(currentUserAnswer as number[]) || [0, 0]}
                        onSliderChange={onMultiSliderChange}
                    />
                );
            case 'custom-rating':
                return (
                    <div key={currentPage}>
                        <span>{maxValue}</span>
                        <RadioGroup key={currentPage} defaultValue={currentUserAnswer} onChange={onRatingChange}>
                            {options?.map((option) => (
                                <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
                            ))}
                        </RadioGroup>
                        <span>{minValue}</span>
                    </div>
                );
            case 'table':
                return (
                    <TableQuestion
                        key={currentPage}
                        value={currentUserAnswer ? (currentUserAnswer as number[]) : undefined}
                        onSubmit={onNavigationClickNext}
                    />
                );
            case 'rating':
                return (
                    <div className={styles.rating_wrapper} key={currentPage}>
                        <span className={styles.rating_label}>{maxValue}</span>
                        <RadioGroup row dir='ltr' defaultValue={currentUserAnswer} onChange={onRatingChange}>
                            {Array.from({ length: 11 }, (_, i) => (
                                <FormControlLabel
                                    key={i}
                                    sx={{ maxWidth: '20px' }}
                                    value={i}
                                    control={<Radio />}
                                    label={i.toString()}
                                    labelPlacement='top'
                                />
                            ))}
                        </RadioGroup>
                        <span className={styles.rating_label}>{minValue}</span>
                    </div>
                );
            case 'decision-tree':
                return (
                    <DecisionTree
                        key={`${currentPage}-${currentRound}`}
                        round={currentRound}
                        value={typeof currentUserAnswer === 'string' ? currentUserAnswer : ''}
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
        onNavigationClickNext,
        onRatingChange,
        onSliderChange,
        options,
        currentUserAnswer,
        valueType
    ]);

    return (
        <div className={styles.preferences_wrapper}>
            <h2 className={styles.title}>שאלון העדפות - שאלה {currentPage + 1}</h2>

            {currentPageData && (
                <div className={cn(styles.question_wrapper, { [styles.custom_question]: !!numOfSubPages })}>
                    <div className={styles.question_header}>
                        {title && <h5>{Parser().parse(title)}</h5>}

                        {description && <p>{description}</p>}
                    </div>

                    <div className={styles.question}>{renderQuestion()}</div>
                </div>
            )}

            <PreferencesNavigationBar
                currentPage={currentPage}
                onClickPrevious={onNavigationClickPrevious}
                onClickNext={onNavigationClickNext}
                nextDisabled={nextDisabled}
                prevDisabled={prevDisabled}
                isForm={isForm}
            />
        </div>
    );
};

type PreferencesNavigationBarProps = {
    currentPage: number;
    onClickNext: () => void;
    onClickPrevious: () => void;
    nextDisabled?: boolean;
    prevDisabled?: boolean;
    isForm?: boolean;
};

const PreferencesNavigationBar = (props: PreferencesNavigationBarProps) => {
    return (
        <div className={styles.navigation_bar}>
            <button onClick={props.onClickPrevious} disabled={props.prevDisabled}>
                הקודם
            </button>

            <h5 className={styles.indicator}>
                שאלה {props.currentPage + 1} מתוך {NUM_PAGES}
            </h5>

            {props.isForm ? (
                <button key={props.currentPage} form='table-form' type='submit' disabled={props.nextDisabled}>
                    הבא
                </button>
            ) : (
                <button key={props.currentPage} onClick={props.onClickNext} disabled={props.nextDisabled}>
                    הבא
                </button>
            )}
        </div>
    );
};
