import { Entity, Enum, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entity/base.entity';
import { ProductTypeEnum } from '../enum/product-type.enum';

@Entity()
export class Product extends BaseEntity {
  @Property({ type: 'string' })
  tenantId!: string;

  @Property({ type: 'string' })
  name!: string;

  @Enum(() => ProductTypeEnum)
  type!: ProductTypeEnum;

  @Property({ type: 'numeric' })
  price!: number;
}
