import { DeepPartial } from 'typeorm';

export interface IBaseCrudService<T> {
  find(): Promise<T[]>;
  findById(id: string): Promise<T>;
  deleteById(id: string): Promise<void>;
  updateById(id: string, entity: DeepPartial<T>): Promise<T>;
  insert(entity: DeepPartial<T>): Promise<T>;
}
