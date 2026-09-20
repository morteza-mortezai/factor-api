import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Index,
} from '@mikro-orm/core';
import { Location } from '../../location/entity/location.entity';
import { Industry } from '../../industry/entities/industry.entity';
import { CompanySize } from './company-size.entity';

@Entity({ tableName: 'companies' })
@Index({ properties: ['name'], name: 'idx_company_name' })
@Index({ properties: ['website'], name: 'idx_company_website' })
@Index({ properties: ['industry'], name: 'idx_company_industry_id' })
@Index({ properties: ['location'], name: 'idx_company_location_id' })
@Index({ properties: ['size'], name: 'idx_company_size_id' })
@Index({ properties: ['founded'], name: 'idx_company_founded' })
export class Company {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  name!: string | null;

  @Property({ nullable: true })
  website!: string | null;

  @ManyToOne(() => CompanySize, { nullable: true })
  size!: CompanySize | null;

  @Property({ nullable: true })
  founded!: string | null;

  @ManyToOne(() => Industry, { nullable: true })
  industry!: Industry | null;

  @ManyToOne(() => Location, { nullable: true })
  location!: Location | null;
}
