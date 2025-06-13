import { shuffle } from 'lodash';
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
    const pagesOrderRef = useRef<number[]>(getShuffledQuestionsOrder());
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [currentSubPage, setCurrentSubPage] = useState<SubPageMap>({ 1: 1, 3: 1, 11: 1 });
    const [currentValue, setCurrentValue] = useState<AnswerType | undefined>();
    const [userAnswers, setUserAnswers] = useState<AnswersMap>([]);
    const questionId = pagesOrderRef.current[currentPage];
    const currentRound = currentSubPage[questionId] - 1;
    const currentPageData = pages[questionId];
    const { title, description, valueType, minValue, maxValue, options, decisionTreeMap = {}, numOfSubPages, formId } = currentPageData;

    const currentUserAnswer = userAnswers[questionId];
    const nextDisabled = !formId && currentValue === undefined;
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
            const answerValue = formId ? value : currentValue;
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
        [currentPage, currentRound, currentSubPage, currentValue, formId, navigate, numOfSubPages, questionId, userAnswers]
    );

    const handleSubmitInputNumber = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const value = formData.get('input-number') as string;
            onNavigationClickNext(Number(value));
        },
        [onNavigationClickNext]
    );

    const onRatingChange = useCallback((_e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setCurrentValue(Number(value));
    }, []);

    const onDecisionTreeClick = useCallback((value: string) => {
        setCurrentValue(value);
    }, []);

    const renderQuestion = useCallback(() => {
        switch (valueType) {
            case 'input-number':
                return (
                    <form key={currentPage} id={formId} className={styles.slider_wrapper} onSubmit={handleSubmitInputNumber}>
                        <input
                            key={currentPage}
                            className={styles.slider_input}
                            name='input-number'
                            type='number'
                            placeholder={`${minValue} - ${maxValue} $`}
                            defaultValue={currentUserAnswer as number}
                            min={minValue}
                            max={maxValue}
                            step={1}
                            required
                        />
                    </form>
                );
            case 'multi-input-number':
                return (
                    <MultiSlider
                        key={`${currentPage}-${currentRound}`}
                        round={currentRound}
                        value={(currentUserAnswer as number[]) || [0, 0]}
                        formId={formId ?? 'input-number-multi'}
                        onSubmit={onNavigationClickNext}
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
                        formId={formId ?? 'table-form'}
                        value={currentUserAnswer ? (currentUserAnswer as number[]) : undefined}
                        onSubmit={onNavigationClickNext}
                    />
                );
            case 'rating':
                return (
                    <div key={currentPage} className={styles.rating_wrapper}>
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
        currentUserAnswer,
        decisionTreeMap,
        formId,
        handleSubmitInputNumber,
        maxValue,
        minValue,
        onDecisionTreeClick,
        onNavigationClickNext,
        onRatingChange,
        options,
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
                formId={formId}
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
    formId?: string;
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

            {props.formId ? (
                <button key={props.currentPage} form={props.formId} type='submit' disabled={props.nextDisabled}>
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

function getShuffledQuestionsOrder() {
    const shuffled = shuffle(QUESTIONS_ORDER);
    const index7 = shuffled.indexOf(7);
    const index9 = shuffled.indexOf(9);

    if (index7 > index9) {
        shuffled[index7] = 9;
        shuffled[index9] = 7;
    }

    return shuffled;
}
