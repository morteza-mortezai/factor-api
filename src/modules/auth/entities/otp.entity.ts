import {
  Entity,
  OptionalProps,
  Property,
  ManyToOne,
  Unique,
} from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entity/base.entity';
import { Tenant } from '../../tenant/entities/tenant.entity';

@Entity()
@Unique({ properties: ['tenant', 'phone'] })
export class Otp extends BaseEntity {
  [OptionalProps]?: 'createdAt' | 'retryCount';

  @ManyToOne(() => Tenant)
  tenant!: Tenant;

  @Property({ type: 'string', length: 11 })
  phone!: string;

  @Property({ type: 'string', length: 5 })
  otp!: string;

  @Property({ type: 'numeric' })
  retryCount = 0;

  @Property({ type: 'timestamptz' })
  expireAt!: Date;
}
