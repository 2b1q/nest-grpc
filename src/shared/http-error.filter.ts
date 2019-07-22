import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const req = context.getRequest();
    const resp = context.getResponse();
    const status =
      (exception.getStatus && exception.getStatus()) ||
      HttpStatus.INTERNAL_SERVER_ERROR;

    const errorObject = {
      code: status,
      timeStamp: new Date(),
      urlPath: req.url,
      method: req.method,
      message: exception.message.error || exception.message || null,
    };

    // Override errorObject.message to client response fi HTTP.STATUS 500
    if (status === 500) {
      errorObject.message = 'Internal Server Error';
      // print full stack trace
      Logger.error(
        `${req.method} ${req.url} msg: ${exception.message}`,
        exception.stack,
        'ExceptionFilter',
      );
    } else {
      Logger.error(
        `${req.method} ${req.url}`,
        JSON.stringify(errorObject),
        'ExceptionFilter',
      );
    }

    resp.status(status).json(errorObject);
  }
}
