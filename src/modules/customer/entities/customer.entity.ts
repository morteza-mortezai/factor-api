import { Entity, Enum, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { CustomerTypeEnum } from '../enum/customer-type.enum';
import { ulid } from 'ulid';
import { Individual } from './individual.entity';
import { Company } from './company.entity';

@Entity()
export class Customer {
  @PrimaryKey()
  id = ulid();

  @Property()
  tenantId!: string;

  @Enum(() => CustomerTypeEnum)
  type!: CustomerTypeEnum;

  @OneToOne(() => Individual, (individual) => individual.customer, {
    nullable: true,
    owner: false,
  })
  individual?: Individual;

  @OneToOne(() => Company, (company) => company.customer, {
    nullable: true,
    owner: false,
  })
  company?: Company;
}
