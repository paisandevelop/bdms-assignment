import winston from 'winston';
import ecsFormat from '@elastic/ecs-winston-format';

const logger = winston.createLogger({
  format: ecsFormat(),
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transports: [new winston.transports.Console()],
});

export function logError(msg: string, error?: Error) {
  if (error) {
    logger.error(msg, { error: error });
  } else {
    logger.error(msg);
  }
}

export function logDebug(msg: string) {
  logger.debug(msg);
}

export function logInfo(msg: string) {
  logger.info(msg);
}
