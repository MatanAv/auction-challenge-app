type ResponseSuccess<T> = {
  status: number;
  data?: T | T[];
};

type ResponseError = {
  status: number;
  message: string;
};

export type ResponseFormat<T> = ResponseSuccess<T> | ResponseError;
