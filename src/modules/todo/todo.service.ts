import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudEntityService } from '../../shared/base-crud-entity/base-crud-entity.service';
import { Todo } from './model/todo.entity';

@Injectable()
export class TodoService extends BaseCrudEntityService<Todo> {
  constructor(@InjectRepository(Todo) private readonly todoRepository: Repository<Todo>) {
    super(todoRepository);
  }
}
