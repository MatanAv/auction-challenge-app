// import { shuffle } from 'lodash';
import { useCallback, useMemo, useRef, useState } from 'react';
import { NUM_PAGES } from './Preferences.model';
import { pages } from './data/pages';
import { TableQuestion } from './TableQuestion/TableQuestion';

import NavigationBar from '@/components/NavigationBar';
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
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [userAnswers, setUserAnswers] = useState<Answer[]>([]);

    const pagesOrderRef = useRef<number[]>(Array.from({ length: NUM_PAGES }, (_, i) => i + 1));
    const valueRef = useRef<number | undefined>();

    const userInputValue = (userAnswers[currentPage - 1]?.value as number) || valueRef.current;

    const currentPageData = useMemo(() => pages[pagesOrderRef.current[currentPage]] || {}, [currentPage]);

    const { title, description, valueType, minValue, maxValue } = currentPageData;

    const handleNavigation = useCallback(() => {
        console.log('User Answers:', userAnswers);
    }, [userAnswers]);

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

    // useEffect(() => {
    // pagesOrderRef.current = shuffle(pagesOrderRef.current);
    // }, []);

    const onSubmit = (value: number[]) => {
        console.log('Submitted values:', value);
    };

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

                    <div>
                        <span>{minValue}</span>
                        {valueType === 'slider' ? (
                            <Slider
                                key={currentPage}
                                step={1}
                                min={minValue as number}
                                max={maxValue as number}
                                value={userInputValue}
                                onChange={(_e, value) => {
                                    valueRef.current = Number(value);
                                }}
                                valueLabelDisplay='on'
                            />
                        ) : valueType === 'custom-rating' ? (
                            <RadioGroup
                                row
                                key={currentPage}
                                value={userInputValue}
                                onChange={(_e, value) => {
                                    valueRef.current = Number(value);
                                }}
                            >
                                {currentPageData.options?.map((option) => (
                                    <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
                                ))}
                            </RadioGroup>
                        ) : valueType === 'table' ? (
                            <TableQuestion onSubmit={onSubmit} />
                        ) : (
                            <RadioGroup
                                row
                                key={currentPage}
                                value={userInputValue}
                                onChange={(_e, value) => {
                                    valueRef.current = Number(value);
                                }}
                            >
                                {Array.from({ length: 11 }, (_, i) => (
                                    <FormControlLabel key={i} value={i} control={<Radio />} label={i.toString()} />
                                ))}
                            </RadioGroup>
                        )}
                        <span>{maxValue}</span>
                    </div>
                </>
            )}

            <NavigationBar
                currentPage={currentPage}
                setPage={setCurrentPage}
                totalPages={NUM_PAGES}
                onNext={handleNext}
                handleNavigate={handleNavigation}
            />
        </div>
    );
};
