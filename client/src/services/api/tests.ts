import axios from 'axios';
import { BASE_URL } from '@/constants/api';
import { IUserTestAnswer } from '@/interfaces/tests';
import { UserTest, UserTraining } from '@/interfaces/user';

const testsApi = axios.create({
  baseURL: `${BASE_URL}/tests`,
  withCredentials: true
});

const getQuestions = async (size: number) => {
  const response = await testsApi.get(`/questions?amount=${size}`);
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

const sendTimeout = async (isTraining: boolean, results: UserTraining | UserTest) => {
  const response = await testsApi.post('/timeout', { isTraining, results });
  return response.data;
};

export { getQuestions, submitTraining, submitTest, sendTimeout };
