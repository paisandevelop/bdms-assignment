import { Inject, Service } from 'typedi';
import { CreateTodoListRequest } from '../models/net/request/create_todo_list_request';
import { TodoListRepository } from '../utils/repository/todo_list_repository';
import { TodoListRequest } from '../models/net/request/get_todo_list_request';
import { UpdateTodoListRequest } from '../models/net/request/update_todo_list_request';

@Service()
export class TodoListDomain {
  constructor(
    @Inject('TodoListRepository')
    private todoListRepository: TodoListRepository,
  ) {}

  async getTodos(params: TodoListRequest) {
    const todos = await this.todoListRepository.getTodos(params.offset ?? 0, params.pageSize ?? 20);
    return todos;
  }

  async createTodo(newTodo: CreateTodoListRequest) {
    const result = await this.todoListRepository.insertTodo(newTodo);
    return result;
  }

  async updateTodoById(id: string, updatedTodo: UpdateTodoListRequest) {
    const result = await this.todoListRepository.updateTodo(id, updatedTodo);
    return result;
  }

  async archiveTodoById(id: string) {
    await this.todoListRepository.archiveTodo(id);
  }
}
