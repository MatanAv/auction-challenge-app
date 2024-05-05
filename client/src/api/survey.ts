import axios from 'axios';
import config from '@/config';
import { ISurveyAnswers } from '@/interfaces/survey';

const surveyApi = axios.create({
  baseURL: `${config.api.BASE_URL}/surveys`,
  withCredentials: true
});

const submitSurvey = async (answers: ISurveyAnswers) => {
  const response = await surveyApi.post('/submit', { answers });
  return response.data;
};

export { submitSurvey };
