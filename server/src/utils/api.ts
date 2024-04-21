import { StatusCodes } from 'http-status-codes';
import { ResponseFormat } from '@/types/api';

const getErrorResponse = (code?: number, message?: string): ResponseFormat => ({
  status: code || StatusCodes.INTERNAL_SERVER_ERROR,
  message: message || 'Internal server error'
});

export { getErrorResponse };
