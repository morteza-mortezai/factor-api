import { Entity, Property, Enum, OneToMany, Collection } from '@mikro-orm/core';
import { BaseEntity } from '../../../../common/entity/base.entity';
import { CurrencyEnum } from '../../domain/enum/currency.enum';
import { InvoiceItemOrm } from './invoice-item-orm.entity';

@Entity({ tableName: 'invoices' })
export class InvoiceOrm extends BaseEntity {
  @Property({ type: 'string' })
  tenantId!: string;

  @OneToMany(() => InvoiceItemOrm, (item) => item.invoice, {
    orphanRemoval: true,
  })
  items = new Collection<InvoiceItemOrm>(this);

  @Property()
  issueDate!: Date;

  @Property()
  dueDate!: Date;

  @Property({ type: 'string' })
  customerId!: string;

  @Property({ type: 'string', nullable: true })
  notes?: string | null;

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
