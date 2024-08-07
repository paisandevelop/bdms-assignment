import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParams,
  UseBefore,
} from 'routing-controllers';
import { TodoListDomain } from '../domains/todo_list_domain';
import { Service } from 'typedi';
import { TodoListRequest } from '../models/net/request/get_todo_list_request';
import { ValidateCreateTodoRequestMiddleware } from '../middlewares/validate_create_todo_request';
import { CreateTodoListRequest } from '../models/net/request/create_todo_list_request';
import { ValidateUpdateTodoRequestMiddleware } from '../middlewares/validate_update_todo_request';
import { UpdateTodoListRequest } from '../models/net/request/update_todo_list_request';

@JsonController('/v1/todos')
@Service()
export class TodoListController {
  constructor(private todoListDomain: TodoListDomain) {}

  @Get('/')
  async getListOfTodos(@QueryParams() params: TodoListRequest) {
    return await this.todoListDomain.getTodos(params);
  }

  @Post('/')
  @UseBefore(ValidateCreateTodoRequestMiddleware)
  async createTodo(@Body() body: CreateTodoListRequest) {
    return await this.todoListDomain.createTodo(body);
  }

  @Put('/:id')
  @UseBefore(ValidateUpdateTodoRequestMiddleware)
  async updateTodoById(
    @Param('id') id: string,
    @Body({ validate: { whitelist: true } }) body: UpdateTodoListRequest
  ) {
    return await this.todoListDomain.updateTodoById(id, body);
  }

  @Delete('/archive/:id')
  async archiveById(@Param('id') id: string) {
    await this.todoListDomain.archiveTodoById(id);
  }
}
