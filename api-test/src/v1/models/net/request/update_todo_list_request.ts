import { IsNotEmpty } from 'class-validator';

export class UpdateTodoListRequest {
  @IsNotEmpty()
  title: string = '';

  @IsNotEmpty()
  todo: string = '';
}
