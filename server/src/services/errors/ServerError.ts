import { StatusCodes } from 'http-status-codes';

export interface IServerError extends Error {
  code: StatusCodes;
}

class ServerError extends Error {
  code: StatusCodes;

  constructor(code: StatusCodes, message: string) {
    super(message);
    this.code = code;
  }
}

export default ServerError;
