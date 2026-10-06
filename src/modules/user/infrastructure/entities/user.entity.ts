import { Entity, Property, OptionalProps, Unique } from '@mikro-orm/core';
import { BaseEntity } from '../../../../common/entity/base.entity';

@Entity({ tableName: 'users' })
@Unique({ properties: ['tenantId', 'phone'] })
export class User extends BaseEntity {
  [OptionalProps]!: 'createdAt' | 'gender';
  @Property({ type: 'string' })
  tenantId!: string;

  @Property({ nullable: true })
  firstName!: string | null;

  @Property({ nullable: true })
  lastName!: string | null;

  @Property({ length: 11, type: 'string' })
  phone!: string;

  @Property({ default: true })
  gender!: boolean;
}
