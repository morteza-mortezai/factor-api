import { Entity, Property, Enum, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entity/base.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { CurrencyEnum } from '../enum/currency.enum';

@Entity()
export class Invoice extends BaseEntity {
  @Property({ type: 'string' })
  tenantId!: string;

  @Property()
  issueDate!: Date;

  @Property()
  dueDate!: Date;

  @ManyToOne(() => Customer)
  customer!: Customer;

  @Property({ type: 'string' })
  notes!: string;

  @Enum(() => CurrencyEnum)
  currency!: CurrencyEnum;

  //----financial ------

  @Property({ type: 'int' })
  subtotal!: number;

  @Property({ type: 'int' })
  total!: number;

  @Property({ type: 'int' })
  tax!: number;

  @Property({ type: 'int' })
  discount!: number;

  @Property({ type: 'int' })
  paidAmount!: number;

  @Property({ type: 'int' })
  balance!: number;
}
