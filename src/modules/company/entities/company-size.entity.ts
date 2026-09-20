import { Entity, PrimaryKey, Property, Index } from '@mikro-orm/core';

@Entity({ tableName: 'company_sizes' })
@Index({ properties: ['size'], name: 'idx_company_size' })
export class CompanySize {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  size!: string | null;
}
