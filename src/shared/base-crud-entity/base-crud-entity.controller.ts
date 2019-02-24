import { Body, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiImplicitBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeepPartial } from 'typeorm';
import { BaseCrudEntity } from './base-crud-entity';
import { BaseCrudEntityService } from './base-crud-entity.service';
import { IBaseCrudController } from './interfaces/IBaseCrudController';
import { IBaseCrudEntityControllerOptions } from './interfaces/IBaseCrudEntityControllerOptions';
import { ConditionalDecorator } from './utils/conditional-decorator';
import { filterMetadata } from './utils/filter-metadata-factory';

const metadataKey = 'swagger/apiModelPropertiesArray';
const excludedMetadata = [':id', ':createdAt', ':updatedAt'];
// tslint:disable-next-line:callable-types
const formatEntityName = (entity: { new (): any }, create = true) => {
  if (create) {
    return `${entity.name}CreateDTO`;
  }

  return `${entity.name}UpdateDTO`;
};

// tslint:disable:no-all-duplicated-branches
// tslint:disable-next-line:no-big-function
export function baseCrudEntityControllerFactory<T extends BaseCrudEntity>(
  options: IBaseCrudEntityControllerOptions<T>,
) {
  const Entity = options.entity;
  const createEntityName: string = options.entityCreateDto ? options.entityCreateDto.name : formatEntityName(Entity);
  const updateEntityName: string = options.entityUpdateDto
    ? options.entityUpdateDto.name
    : formatEntityName(Entity, false);
  const EntityCreateDTO =
    options.entityCreateDto || filterMetadata(Entity, metadataKey, excludedMetadata, createEntityName);
  const EntityUpdateDTO =
    options.entityUpdateDto || filterMetadata(Entity, metadataKey, excludedMetadata, updateEntityName);

  abstract class BaseCrudEntityController implements IBaseCrudController<T> {
    constructor(protected readonly baseCrudEntityService: BaseCrudEntityService<T>) {}

    @ConditionalDecorator(!options.find.disabled, Get())
    @ConditionalDecorator(options.find.jwt, ApiBearerAuth())
    @ConditionalDecorator(options.find.jwt, UseGuards(AuthGuard('jwt')))
    @ApiResponse({ status: 200, type: Entity, isArray: true, description: 'Found entities' })
    @HttpCode(200)
    async find(): Promise<T[]> {
      return await this.baseCrudEntityService.find();
    }

    @ConditionalDecorator(!options.findEntityById.disabled, Get(':id'))
    @ConditionalDecorator(options.findEntityById.jwt, ApiBearerAuth())
    @ConditionalDecorator(options.findEntityById.jwt, UseGuards(AuthGuard('jwt')))
    @ApiOperation({
      title: 'Get entity by ID',
    })
    @ApiResponse({ status: 200, type: Entity, description: 'Found entity' })
    @HttpCode(200)
    async findEntityById(@Param('id') id: string): Promise<T> {
      return await this.baseCrudEntityService.findById(id);
    }

    @ConditionalDecorator(!options.deleteEntityById.disabled, Delete(':id'))
    @ConditionalDecorator(options.deleteEntityById.jwt, ApiBearerAuth())
    @ConditionalDecorator(options.deleteEntityById.jwt, UseGuards(AuthGuard('jwt')))
    @ApiOperation({
      title: 'Delete a entity by ID',
    })
    @ApiResponse({ status: 204, type: null, description: 'Empty response' })
    @HttpCode(204)
    async deleteEntityById(@Param('id') id: string): Promise<void> {
      return await this.baseCrudEntityService.deleteById(id);
    }

    @ConditionalDecorator(!options.createEntity.disabled, Post())
    @ConditionalDecorator(options.createEntity.jwt, ApiBearerAuth())
    @ConditionalDecorator(options.createEntity.jwt, UseGuards(AuthGuard('jwt')))
    @ApiOperation({
      title: 'Create a entity',
    })
    @ApiResponse({ status: 201, type: Entity, description: 'Created entity' })
    @ApiImplicitBody({
      name: createEntityName,
      type: EntityCreateDTO,
      description: 'Data for entity creation',
      required: true,
      isArray: false,
    })
    @HttpCode(201)
    async createEntity(@Body() entity: DeepPartial<T>): Promise<T> {
      return await this.baseCrudEntityService.insert(entity);
    }

    @ConditionalDecorator(!options.updateEntityById.disabled, Put(':id'))
    @ConditionalDecorator(options.updateEntityById.jwt, ApiBearerAuth())
    @ConditionalDecorator(options.updateEntityById.jwt, UseGuards(AuthGuard('jwt')))
    @ApiImplicitBody({
      name: updateEntityName,
      type: EntityUpdateDTO,
      description: 'Data for entity update',
      required: true,
      isArray: false,
    })
    @ApiOperation({
      title: 'Update a entity by ID',
    })
    @ApiResponse({ status: 200, type: Entity, description: 'Updated entity' })
    @HttpCode(200)
    async updateEntityById(@Param('id') id: string, @Body() entity: DeepPartial<T>): Promise<T> {
      return await this.baseCrudEntityService.updateById(id, entity);
    }
  }

  return BaseCrudEntityController;
}
