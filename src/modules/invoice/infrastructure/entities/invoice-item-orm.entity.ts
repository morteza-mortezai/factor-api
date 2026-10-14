import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../../common/entity/base.entity';
import { InvoiceOrm } from './invoice-orm.entity';

@Entity({ tableName: 'invoice_items' })
export class InvoiceItemOrm extends BaseEntity {
  @ManyToOne(() => InvoiceOrm)
  invoice!: InvoiceOrm;

  @Property({ type: 'string' })
  productId!: string;

  @Property({ type: 'int' })
  quantity!: number;

  @Property({ type: 'int' })
  unitPrice!: number;

  @Property({ type: 'int' })
  discount!: number;

  @Property({ type: 'int' })
  total!: number;
}
