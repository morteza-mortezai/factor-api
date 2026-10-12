import { Entity, Property, Enum, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entity/base.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { CurrencyEnum } from '../enum/currency.enum';

@Entity()
export class Invoice extends BaseEntity {
  @Property({ type: 'string' })
  tenantId!: string;

  @Property({type:'string'})
  title!:string

  @Property({type:'string'})
  description!:string

  @Property({type:'numeric',nullable:true})
  amount?:number
 
  stage
  probability

  @Property({type:'numeric',nullable:true})
  expected_close_date ?: Date;
  
  assigned_to_id      -> users.id

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
