import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Index,
} from '@mikro-orm/core';
import { Company } from '../../company/entities/company.entity';
import { Title } from './title.entity';
import { Industry } from '../../industry/entities/industry.entity';

@Entity({ tableName: 'jobs' })
@Index({ properties: ['industry'], name: 'idx_job_industry_id' })
@Index({ properties: ['title'], name: 'idx_job_title_id' })
@Index({ properties: ['company'], name: 'idx_job_company_id' })
@Index({ properties: ['last_updated'], name: 'idx_job_last_updated' })
@Index({ properties: ['startDate'], name: 'idx_job_start_date' })
export class Job {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Industry, { deleteRule: 'restrict' })
  industry!: Industry;

  @Property({ nullable: true })
  summary!: string | null;

  @ManyToOne(() => Title, { deleteRule: 'restrict' })
  title!: Title;

  @ManyToOne(() => Company)
  company!: Company;

  @Property({ nullable: true })
  last_updated!: Date | null;

  @Property({ nullable: true })
  startDate!: Date | null;
}
