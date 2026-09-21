import { Entity, OptionalProps, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entity/base.entity';

@Entity()
export class Otp extends BaseEntity {
  [OptionalProps]?: 'createdAt' | 'retryCount';

  @Property({ type: 'string', length: 11 })
  phone!: string;

  @Property({ type: 'string', length: 5 })
  otp!: string;

  @Property({ type: 'numeric' })
  retryCount = 0;

  @Property({ type: 'timestamptz' })
  expireAt!: Date;
}
