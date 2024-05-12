import axios from 'axios';
import config from '@/config';
import { IUserInfo, IUserInstructions } from '@/interfaces/user';

const usersApi = axios.create({
  baseURL: `${config.api.BASE_URL}/users`,
  withCredentials: true
});

const registerUser = async (worker_id: string) => {
  const response = await usersApi.post('/register', { worker_id });
  return response.data;
};

const logoutUser = async () => {
  const response = await usersApi.get('/logout');
  return response.data;
};

const submitUserInfo = async (user_info: IUserInfo) => {
  const response = await usersApi.put('/info', { user_info });
  return response.data;
};

const submitUserInstructions = async (user_instructions: IUserInstructions) => {
  const response = await usersApi.put('/instructions', { user_instructions });
  return response.data;
};

export { registerUser, logoutUser, submitUserInfo, submitUserInstructions };
