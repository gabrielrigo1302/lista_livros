import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundError extends Error {
  code: number;

  constructor(message = 'Objeto não encontrado') {
    super();
    this.message = message;
    this.code = HttpStatus.NOT_FOUND;
  }
}

export class ForbiddenError extends Error {
  code: number;

  constructor(message = 'Operação não permitida') {
    super();
    this.message = message;
    this.code = HttpStatus.FORBIDDEN;
  }
}

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
