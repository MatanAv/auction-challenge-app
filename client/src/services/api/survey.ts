import axios from 'axios';
import { BASE_URL } from '@/constants/api';
import { SurveyAnswers } from '@/interfaces/survey';

const surveyApi = axios.create({
  baseURL: `${BASE_URL}/surveys`,
  withCredentials: true
});

const submitSurvey = async (answers: SurveyAnswers) => {
  const response = await surveyApi.post('/submit', { answers });
  return response.data;
};

export { submitSurvey };
