import { filterMetadata } from '../../../shared/base-crud-entity/utils/filter-metadata-factory';
import { Todo } from '../model/todo.entity';

export class TodoCreateDTO extends filterMetadata(
    Todo,
    'swagger/apiModelPropertiesArray',
    [':id', ':createdAt', ':updatedAt', ':done'],
    'TodoCreateDto',
  ) {
}