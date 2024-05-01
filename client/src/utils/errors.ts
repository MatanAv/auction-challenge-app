import { isAxiosError } from 'axios';
import { StatusError } from '@/interfaces/errors';

const getErrorFromAxiosError = (error: unknown): StatusError | Error =>
  isAxiosError(error) ? (error.response?.data as StatusError) : (error as Error);

export { getErrorFromAxiosError };
