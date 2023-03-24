import { HttpException } from '@nestjs/common';

export const errorMessage = (code, message) => {
  const response = new HttpException(
    {
      code,
      message,
    },
    code,
  );

  return response;
};
