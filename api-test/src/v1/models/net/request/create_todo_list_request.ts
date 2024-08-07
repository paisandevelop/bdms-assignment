import { IsNotEmpty } from 'class-validator';

export class CreateTodoListRequest {
  @IsNotEmpty()
  title: string = '';

  @IsNotEmpty()
  todo: string = '';
}
