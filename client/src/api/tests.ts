import axios from 'axios';
import config from '@/config';
import { IUserTestAnswer } from '@/interfaces/tests';
import { IUserTest, IUserTraining } from '@/interfaces/user';

const testsApi = axios.create({
  baseURL: `${config.api.BASE_URL}/tests`,
  withCredentials: true
});

const getTrainingQuestions = async () => {
  const response = await testsApi.get('/questions/training');
  return response.data;
};

const getTestQuestions = async () => {
  const response = await testsApi.get('/questions/test');
  return response.data;
};

const submitTraining = async (answers: IUserTestAnswer[], timeout = false) => {
  const response = await testsApi.post('/submit/training', { answers, timeout });
  return response.data;
};

const submitTest = async (answers: IUserTestAnswer[], timeout = false) => {
  const response = await testsApi.post('/submit/test', { answers, timeout });
  return response.data;
};

const sendTimeout = async (isTraining: boolean, results: IUserTraining | IUserTest) => {
  const response = await testsApi.post('/timeout', { isTraining, results });
  return response.data;
};

export { getTrainingQuestions, getTestQuestions, submitTraining, submitTest, sendTimeout };
