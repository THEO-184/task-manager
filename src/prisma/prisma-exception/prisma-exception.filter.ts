import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.log('error message', exception);
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        const message = exception.message
          .split('\n')
          .find((msg) => msg.toLowerCase().includes('constraint failed'));
        res.status(status).json({
          statusCode: status,
          message,
        });
        break;
      }

      case 'P2025': {
        res.status(HttpStatus.NOT_FOUND).json({
          message: 'Invalid Credenitials',
          statusCode: HttpStatus.NOT_FOUND,
        });
        break;
      }

      case 'P2016': {
        const status = HttpStatus.NOT_IMPLEMENTED;
        const message = exception.message;
        res.status(status).json({
          statusCode: status,
          message: 'wrong ID',
        });
      }

      default:
        super.catch(exception, host);
        break;
    }
  }
}
