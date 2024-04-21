import axios from 'axios';
import { BASE_URL } from '@/constants/api';
import { UserInfo, UserInstructions } from '@/interfaces/user';

const usersApi = axios.create({
  baseURL: `${BASE_URL}/users`
});

const registerUser = async (worker_id: string) => {
  const response = await usersApi.post('/register', { worker_id });
  return response.data;
};

const submitUserInfo = async (user_info: UserInfo) => {
  const response = await usersApi.put('/info', { user_info });
  return response.data;
};

const submitUserInstructions = async (user_instructions: UserInstructions) => {
  const response = await usersApi.put('/instructions', { user_instructions });
  return response.data;
};

export { registerUser, submitUserInfo, submitUserInstructions };
