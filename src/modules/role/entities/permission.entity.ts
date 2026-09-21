import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entity/base.entity';
import { Role } from './role.entity';

@Entity()
export class Permission extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  title!: string;

  @ManyToOne(() => Role, { deleteRule: 'cascade' })
  role!: Role;
}
