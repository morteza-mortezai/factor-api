import { Entity, PrimaryKey, Property, Index } from '@mikro-orm/core';

@Entity({ tableName: 'location_names' })
@Index({ properties: ['name'], name: 'idx_location_name' })
export class LocationName {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  name!: string | null;
}
