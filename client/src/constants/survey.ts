import { Q1Answers, Q2Answers, Q3Answers } from '@/enums/survey';

const surveyQuestions = [
  {
    id: 'q1',
    title: 'Overall, how satisfied were you with this HIT?',
    options: Object.values(Q1Answers)
  },
  {
    id: 'q2',
    title: 'What was your attention span when you did the HIT?',
    options: Object.values(Q2Answers)
  },
  {
    id: 'q3',
    title: 'Are you happy with the bonus?',
    options: Object.values(Q3Answers)
  }
];

export { surveyQuestions };
