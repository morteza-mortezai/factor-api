import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entity/base.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class InvoiceItem extends BaseEntity {
  @ManyToOne(() => Product)
  product!: Product;

  @Property({ type: 'int' })
  quantity!: number;

  @Property({ type: 'int' })
  unitPrice!: number;

  @Property({ type: 'int' })
  discount!: number;

  @Property({ type: 'int' })
  total!: number;
}
