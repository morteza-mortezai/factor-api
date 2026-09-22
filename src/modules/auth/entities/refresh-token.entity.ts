import {
  Entity,
  ManyToOne,
  OptionalProps,
  Property,
  Unique,
} from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entity/base.entity';
import { Tenant } from '../../tenant/entities/tenant.entity';

@Entity()
@Unique({ properties: ['tenant', 'userId'] })
export class RefreshToken extends BaseEntity {
  [OptionalProps]!: 'createdAt';

  @ManyToOne(() => Tenant)
  tenant!: Tenant;

  @Property()
  userId!: string;

  @Property()
  hashedToken!: string;

  @Property({ type: 'timestamptz' })
  expireAt!: Date;
}
