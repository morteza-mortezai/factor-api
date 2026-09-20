import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { ulid } from 'ulid';
import { Customer } from './customer.entity';

@Entity()
export class Individual {
  @PrimaryKey()
  id = ulid();

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property({ type: 'string', nullable: true })
  address?: string;

  @Property({ type: 'string', nullable: true })
  phone?: string;

  @OneToOne(() => Customer, (customer) => customer.company, {
    deleteRule: 'cascade',
    nullable: true,
    owner: true,
  })
  customer!: Customer;
}
