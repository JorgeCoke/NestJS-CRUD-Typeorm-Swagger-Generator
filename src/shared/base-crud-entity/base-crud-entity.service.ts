import { NotFoundException } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { BaseCrudEntity } from './base-crud-entity';
import { NOT_FOUND_BY_ID } from './base-crud-entity.constants';
import { IBaseCrudService } from './interfaces/IBaseCrudService';

export class BaseCrudEntityService<T extends BaseCrudEntity> implements IBaseCrudService<T> {
  constructor(private readonly repository: Repository<T>) {}

  async find(): Promise<T[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<T> {
    const entity: T = await this.repository.findOne({ where: { id } });
    if (entity) {
      return entity;
    }
    throw new NotFoundException(`${NOT_FOUND_BY_ID}${id}`);
  }

  async deleteById(id: string): Promise<void> {
    await this.findById(id);
    await this.repository.delete(id);
    return;
  }

  async insert(entity: DeepPartial<T>): Promise<T> {
    delete entity.id;
    return await this.repository.save(entity);
  }

  async updateById(id: string, entity: DeepPartial<T>): Promise<T> {
    await this.findById(id);
    const updateEntity = Object.assign({}, entity);
    // tslint:disable-next-line:no-angle-bracket-type-assertion
    (<any> updateEntity.id) = id;
    await this.repository.save(updateEntity);
    return await this.findById(id);
  }
}
