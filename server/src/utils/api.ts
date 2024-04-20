import { ResponseFormat } from '@/types/api';

const getResponse = async <T>(status: number, message?: string, data?: T | T[]): Promise<ResponseFormat<T>> => {
  return { status, data, message };
};

export { getResponse };
