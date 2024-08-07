import { DataResponseWithPagination } from '../../models/net/response/basic_response';
import { NotFoundError } from 'routing-controllers';
import * as path from 'path';
import * as fs from 'fs';
import { CreateTodoListRequest } from '../../models/net/request/create_todo_list_request';
import { UpdateTodoListRequest } from '../../models/net/request/update_todo_list_request';

export class TodoListRepository {
  private todos: any = [];
  private jsonFile: string = '';

  constructor(
    private dataFilePath: string) {
      this.jsonFile = path.join(dataFilePath, 'todos.json');
  }

  getTodos(offset: number, size: number) {
    const data = this.todos.slice(offset, offset + size);
    const totalCount = this.todos.length;

    const result = new DataResponseWithPagination();
    result.data = data;
    result.pagination = {
      offset: offset,
      limit: size,
      count: totalCount,
      totalPage: Math.ceil(totalCount / size),
      totalRecord: totalCount,
    };

    return result;
  }

  insertTodo(data: CreateTodoListRequest) {
    const now = new Date();
    const todo: any = {
      id: now.getTime().toString(),
      title: data.title,
      todo: data.todo,
      createdDate: now,
      updatedDate: null
    }
    
    this.todos.push(todo);
    fs.writeFileSync(this.jsonFile, JSON.stringify(this.todos));

    return todo;
  }

  updateTodo(id: string, data: UpdateTodoListRequest) {
    const found = this.todos.find((todo: any) => todo.id === id);
    if (!found) {
      throw new NotFoundError(`Cannot find todo[${id}]`);
    }

    found.title = data.title;
    found.todo = data.todo;
    found.updatedDate = new Date();

    fs.writeFileSync(this.jsonFile, JSON.stringify(this.todos));

    return found;
  }

  archiveTodo(id: string) {
    const found = this.todos.find((todo: any) => todo.id === id);
    if (!found) {
      throw new NotFoundError(`Cannot find todo[${id}]`);
    }

    this.todos = this.todos.filter((todo: any) => todo.id !== id);

    fs.writeFileSync(this.jsonFile, JSON.stringify(this.todos));
  }

  init() {
    const data: string = fs.readFileSync(this.jsonFile).toString();
    this.todos = data.length > 0 ? JSON.parse(data) : [];
  }
}
