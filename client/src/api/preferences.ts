import axios from 'axios';
import config from '@/config';
import { AnswersMap } from '@/pages/Preferences/Preferences';
import { question1Map, question3Map } from '@/pages/Preferences/data/decision-tree';

const preferencesApi = axios.create({
    baseURL: `${config.api.BASE_URL}/preferences`,
    withCredentials: true
});

const submitPreferences = async (answers: AnswersMap) => {
    const transformedAnswers = { ...answers };
    transformedAnswers[1] = question1Map[answers[1] as string] || answers[1];
    transformedAnswers[3] = question3Map[answers[3] as string] || answers[3];
    const response = await preferencesApi.post('/submit', { answers: transformedAnswers });
    return response.data;
};

export { submitPreferences };
