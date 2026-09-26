import {
  Entity,
  ManyToOne,
  OptionalProps,
  Property,
  Unique,
} from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entity/base.entity';
import { Tenant } from '../../tenant/entities/tenant.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
@Unique({ properties: ['tenant', 'user'] })
export class RefreshToken extends BaseEntity {
  [OptionalProps]!: 'createdAt';

  @ManyToOne(() => Tenant)
  tenant!: Tenant;

  @ManyToOne(() => User)
  user!: User;

  @Property()
  hashedToken!: string;

  @Property({ type: 'timestamptz' })
  expireAt!: Date;
}
