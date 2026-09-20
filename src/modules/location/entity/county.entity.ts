import { Entity, PrimaryKey, Property, Index } from '@mikro-orm/core';

@Entity({ tableName: 'counties' })
@Index({ properties: ['name'], name: 'idx_county_name' })
export class County {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  name!: string | null;
}
