import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entity/base.entity';

@Entity()
export class RefreshToken extends BaseEntity {
  @Property()
  hashedToken!: string;
}
