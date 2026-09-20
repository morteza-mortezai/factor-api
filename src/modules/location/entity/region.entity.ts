import { Entity, PrimaryKey, Property, Index } from '@mikro-orm/core';

@Entity({ tableName: 'regions' })
@Index({ properties: ['name'], name: 'idx_region_name' })
export class Region {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  name!: string | null;
}
