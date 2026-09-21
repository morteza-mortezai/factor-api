import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entity/base.entity';

@Entity()
export class Otp extends BaseEntity {
  @Property({ type: 'string', length: 11 })
  phone!: string;

  @Property({ type: 'string', length: 5 })
  otp!: string;

  @Property({ type: 'timestamptz' })
  expireAt!: Date;
}
