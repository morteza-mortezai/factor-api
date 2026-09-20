import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entity/base.entity';

@Entity()
export class Invoice extends BaseEntity {
  @Property({ type: 'string' })
  tenantId!: string;

  @Property()
  dueDate!: Date;
}
