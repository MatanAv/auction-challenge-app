import { StatusCodes } from 'http-status-codes';
import { ResponseFormat } from '@/types/api';

const getErrorResponse = (error: any, code?: number, message?: string): ResponseFormat => {
  console.log(error);
  return {
    status: code || StatusCodes.INTERNAL_SERVER_ERROR,
    message: message || 'Internal server error'
  };
};

export { getErrorResponse };
