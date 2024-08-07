import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class TodoListRequest {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  offset!: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  pageSize!: number;
}
