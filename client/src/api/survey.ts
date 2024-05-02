import axios from 'axios';
import config from '@/config';
import { SurveyAnswers } from '@/interfaces/survey';

const surveyApi = axios.create({
  baseURL: `${config.api.BASE_URL}/surveys`,
  withCredentials: true
});

const submitSurvey = async (answers: SurveyAnswers) => {
  const response = await surveyApi.post('/submit', { answers });
  return response.data;
};

export { submitSurvey };
