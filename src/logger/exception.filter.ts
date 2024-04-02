import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { CustomLogger } from './logger.service';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLogger) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const statusCode = exception.getStatus() || 500;
    const message = exception.message || 'Internal Server Error';

    const error = {
      request: {
        method: request.method,
        url: request.url,
        body: request.body,
        query: request.query,
      },
      response: {
        statusCode,
        message,
      },
    };
    this.logger.error(JSON.stringify(error));

    response.status(statusCode).json(error);
  }
}
