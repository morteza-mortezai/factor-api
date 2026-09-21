import { Entity, Enum, OneToOne, Property } from '@mikro-orm/core';
import { CustomerTypeEnum } from '../enum/customer-type.enum';
import { Individual } from './individual.entity';
import { Company } from './company.entity';
import { BaseEntity } from '../../../common/entity/base.entity';

@Entity()
export class Customer extends BaseEntity {
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
