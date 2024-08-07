import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';
import { logDebug } from '../utils/log/log';

@Service()
@Middleware({ type: 'before' })
export class LoggingRequestMiddleware implements ExpressMiddlewareInterface {
  use(request: Request, _: Response, next: NextFunction): void {
    logDebug(`LoggingRequestMiddleware:: method: [${request.method}], url: [${request.url}]`);
    next();
  }
}
