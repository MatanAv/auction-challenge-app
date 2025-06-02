import axios from 'axios';
import config from '@/config';
import { AnswersMap } from '@/pages/Preferences/Preferences';

const preferencesApi = axios.create({
    baseURL: `${config.api.BASE_URL}/preferences`,
    withCredentials: true
});

const submitPreferences = async (answers: AnswersMap) => {
    const response = await preferencesApi.post('/submit', { answers });
    return response.data;
};

export { submitPreferences };
