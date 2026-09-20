import { Entity, PrimaryKey, Property, Index } from '@mikro-orm/core';

@Entity({ tableName: 'countries' })
@Index({ properties: ['name'], name: 'idx_country_name' })
export class Country {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  name!: string | null;
}
