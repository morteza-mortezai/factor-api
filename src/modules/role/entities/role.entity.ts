import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entity/base.entity';
import { Permission } from './permission.entity';

@Entity()
export class Role extends BaseEntity {
  @Property({ type: 'string' })
  tenantId!: string;

  @Property()
  name!: string;

  @Property()
  title!: string;

  @OneToMany(() => Permission, (permission) => permission.role, {
    orphanRemoval: true,
    cascade: [Cascade.PERSIST],
  })
  permissions = new Collection<Permission>(this);
}
