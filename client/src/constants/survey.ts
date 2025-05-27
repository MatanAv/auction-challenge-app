import { Q1Answers, Q2Answers, Q3Answers } from '@/enums/survey';

const surveyQuestions = [
    {
        id: 'q1',
        title: 'באופן כללי, עד כמה היית מרוצה מהמשימה הזו?',
        options: Object.values(Q1Answers)
    },
    {
        id: 'q2',
        title: 'מה היה טווח הקשב שלך בזמן המשימה?',
        options: Object.values(Q2Answers)
    },
    {
        id: 'q3',
        title: 'Are you happy with the bonus?',
        options: Object.values(Q3Answers)
    }
];

export { surveyQuestions };
