import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Company } from '../../company/entities/company.entity';
import { Title } from './title.entity';

@Entity({ tableName: 'expriences' })
export class Exprience {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Company, { deleteRule: 'restrict' })
  company!: Company;

  @Property()
  endDate!: Date;

  @Property()
  startDate!: Date;

  @ManyToOne(() => Title, { deleteRule: 'restrict' })
  title!: Title;

  @Property()
  is_primary!: string;

  @Property({ nullable: true })
  summary!: string | null;
}
