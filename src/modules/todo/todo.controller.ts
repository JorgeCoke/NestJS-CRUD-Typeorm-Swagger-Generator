import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { baseCrudEntityControllerFactory } from '../../shared/base-crud-entity/base-crud-entity.controller';
import { Todo } from './model/todo.entity';
import { TodoService } from './todo.service';
import { TodoCreateDTO } from './dto/todo-create.dto';

const BaseCrudEntityController = baseCrudEntityControllerFactory<Todo>({
  entity: Todo,
  entityCreateDto: TodoCreateDTO,
  find: {
  },
  createEntity: {
  },
  findEntityById: {
    jwt: true,
  },
  updateEntityById: {
    jwt: true,
  },
  deleteEntityById: {
    jwt: true,
  },
});

@Controller(`api/todos`)
@ApiUseTags('todos')
export class TodoController extends BaseCrudEntityController {
  constructor(public todoService: TodoService) {
    super(todoService);
  }
}
