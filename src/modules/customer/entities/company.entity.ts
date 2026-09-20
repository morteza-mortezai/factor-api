import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { ulid } from 'ulid';
import { Customer } from './customer.entity';

@Entity()
export class Company {
  @PrimaryKey()
  id = ulid();

  @Property()
  legalName!: string;

  @OneToOne(() => Customer, (customer) => customer.company, {
    nullable: false,
    owner: true,
    deleteRule: 'cascade',
  })
  customer!: Customer;
}
