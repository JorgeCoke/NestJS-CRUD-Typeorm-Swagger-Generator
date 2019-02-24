import { ApiModelProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { IBaseCrudEntity } from './interfaces/IBaseCrudEntity';

export abstract class BaseCrudEntity implements IBaseCrudEntity {
  @ApiModelProperty({ type: String })
  @IsUUID()
  @PrimaryColumn('uuid', {
    type: 'uuid',
    generated: true,
    length: 36,
  })
  id?: string;

  @ApiModelProperty({ type: Date, example: 'YYYY-MM-DDTHH:MM:SS.mmmZ' })
  @CreateDateColumn()
  createdAt?: Date;

  @ApiModelProperty({ type: Date, example: 'YYYY-MM-DDTHH:MM:SS.mmmZ' })
  @UpdateDateColumn()
  updatedAt?: Date;
}
