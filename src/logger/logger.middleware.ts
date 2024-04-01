import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CustomLogger } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLogger) {}
  // TODO: rewrite, add logic
  use(req: Request, res: Response, next: NextFunction): void {
    const { method, url, query, body } = req;
    this.logger.log(
      `Incoming Request - method: ${method}, url: ${url}, query: ${JSON.stringify(
        query,
      )}, body: ${JSON.stringify(body)}}`,
    );

    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(
        `Response Sent - statusCode: ${statusCode}, res: ${JSON.stringify(
          res,
        )}`,
      );
    });

    next();
  }
}
