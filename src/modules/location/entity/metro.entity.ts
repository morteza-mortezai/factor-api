import { Entity, PrimaryKey, Property, Index } from '@mikro-orm/core';

@Entity({ tableName: 'metros' })
@Index({ properties: ['name'], name: 'idx_metro_name' })
export class Metro {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  name!: string | null;
}
