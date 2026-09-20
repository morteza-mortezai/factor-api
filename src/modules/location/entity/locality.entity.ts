import { Entity, PrimaryKey, Property, Index } from '@mikro-orm/core';

@Entity({ tableName: 'localities' })
@Index({ properties: ['name'], name: 'idx_locality_name' })
export class Locality {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  name!: string | null;
}
