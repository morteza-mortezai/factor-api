import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity({ tableName: 'school_types' })
@Unique({ properties: ['name'] })
export class SchoolType {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;
}
