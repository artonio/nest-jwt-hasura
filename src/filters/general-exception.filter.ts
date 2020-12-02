import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';
import { AppApolloError, AppErrorEnum } from './AppApolloError';
import { QueryFailedError } from 'typeorm';

export enum PSQLErrorCode {
  DUPLICATE_KEY_VIOLATION = '23505',
}

@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    if (host.getType<GqlContextType>() === 'graphql') {

      if (exception instanceof QueryFailedError) {
        const e = exception as any
        if (e.code === PSQLErrorCode.DUPLICATE_KEY_VIOLATION) {
          throw new AppApolloError(
            e.detail,
            AppErrorEnum.DUPLICATE_RECORD,
            HttpStatus.CONFLICT.toString(),
          )
        } else {
          throw new AppApolloError(
            e.detail,
            AppErrorEnum.OTHER,
            HttpStatus.INTERNAL_SERVER_ERROR.toString(),
          )
        }
      }

      if (exception instanceof AppApolloError) {
        throw exception
      }
    } else {
      throw new HttpException(exception.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
