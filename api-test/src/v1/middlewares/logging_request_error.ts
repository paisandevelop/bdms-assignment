import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';
import { logError } from '../utils/log/log';

@Service()
@Middleware({ type: 'after' })
export class LoggingErrorMiddleware implements ExpressErrorMiddlewareInterface {
  error(error: HttpError, request: Request, response: Response, next: NextFunction): void {
    const statusCode = error.httpCode || 500;
    const errorMessage = error.message;

    logError(`LoggingErrorMiddleware:: url: [${request.url}], error: [${errorMessage}]`, error);

    response.status(statusCode).json({ message: errorMessage });
  }
}
