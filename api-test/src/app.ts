import 'reflect-metadata';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { useContainer, useExpressServer } from 'routing-controllers';
import Container from 'typedi';
import bodyParser from 'body-parser';
import { LoggingRequestMiddleware } from './v1/middlewares/logging_request';
import { LoggingErrorMiddleware } from './v1/middlewares/logging_request_error';
import { TodoListController } from './v1/controllers/todo_list_controller';
import { logDebug } from './v1/utils/log/log';
import { TodoListRepository } from './v1/utils/repository/todo_list_repository';
import { rateLimitMiddleware } from './v1/middlewares/rate_limit';

dotenv.config();

useContainer(Container);

const port = process.env.PORT || 8080;

useContainer(Container);
const app = express();

app.use(
  express.json({
    limit: '50mb',
  })
);

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(rateLimitMiddleware);

useExpressServer(app, {
  cors: true,
  defaultErrorHandler: false,
  routePrefix: '/assignment',
  controllers: [TodoListController],
  middlewares: [LoggingRequestMiddleware, LoggingErrorMiddleware],
});

const dataFilePath = process.env.DATA_FILE_PATH as string;

const todoListRepository = new TodoListRepository(dataFilePath);

Container.set('TodoListRepository', todoListRepository);

async function start() {
  logDebug('Loading todos from JSON file');
  todoListRepository.init();
}

start();

app.listen(port, () => {
  console.log(`⚡️[server]: Assignment API is running at http://localhost:${port}`);
});
