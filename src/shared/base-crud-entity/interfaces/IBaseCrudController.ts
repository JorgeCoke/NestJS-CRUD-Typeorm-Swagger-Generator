import { DeepPartial } from 'typeorm';

export interface IBaseCrudController<T> {
  find(req: any): Promise<T[]>;
  findEntityById(id: string, req: any): Promise<T>;
  deleteEntityById(id: string, req: any): Promise<void>;
  createEntity(entity: DeepPartial<T>, req: any): Promise<T>;
  updateEntityById(id: string, entity: DeepPartial<T>, req: any): Promise<T>;
}
