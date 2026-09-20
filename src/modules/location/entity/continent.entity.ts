import { Entity, PrimaryKey, Property, Index } from '@mikro-orm/core';

@Entity({ tableName: 'continents' })
@Index({ properties: ['name'], name: 'idx_continent_name' })
export class Continent {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  name!: string | null;
}
