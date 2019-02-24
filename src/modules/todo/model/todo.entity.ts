import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseCrudEntity } from '../../../shared/base-crud-entity/base-crud-entity';

@Entity()
export class Todo extends BaseCrudEntity {
  @ApiModelProperty({ type: String })
  @IsString()
  @Column({ type: String })
  text: string;

  @ApiModelProperty({ type: Boolean })
  @IsBoolean()
  @Column({ type: Boolean, default: false })
  done: boolean;
}
