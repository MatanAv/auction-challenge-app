import { Q1Answers, Q2Answers } from '@/enums/survey';

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
    }
];

export { surveyQuestions };
