import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity({ tableName: 'industries' })
@Unique({ properties: ['name'] })
export class Industry {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  name!: string | null;
}
