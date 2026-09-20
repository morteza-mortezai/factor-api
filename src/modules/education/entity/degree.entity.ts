import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity({ tableName: 'degrees' })
@Unique({ properties: ['name'] })
export class Degree {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;
}
