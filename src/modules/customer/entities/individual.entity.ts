import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { Customer } from './customer.entity';
import { BaseEntity } from '../../../common/entity/base.entity';

@Entity()
export class Individual extends BaseEntity {
  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property({ type: 'string', nullable: true })
  address?: string;

  @Property({ type: 'string', nullable: true })
  phone?: string;

  @OneToOne(() => Customer, (customer) => customer.individual, {
    deleteRule: 'cascade',
    nullable: true,
    owner: true,
  })
  customer!: Customer;
}
