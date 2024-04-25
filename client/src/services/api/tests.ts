import axios from 'axios';
import { BASE_URL } from '@/constants/api';
import { IUserTestAnswer } from '@/interfaces/tests';

const testsApi = axios.create({
  baseURL: `${BASE_URL}/tests`,
  withCredentials: true
});

const getQuestions = async (size: number) => {
  const response = await testsApi.get(`/questions?amount=${size}`);
  return response.data;
};

const submitTraining = async (answers: IUserTestAnswer[]) => {
  const response = await testsApi.post('/submit/training', { answers });
  return response.data;
};

const submitTest = async (answers: IUserTestAnswer[]) => {
  const response = await testsApi.post('/submit/test', { answers });
  return response.data;
};

export { getQuestions, submitTraining, submitTest };
