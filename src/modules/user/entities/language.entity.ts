import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity({ tableName: 'languages' })
@Unique({ properties: ['name', 'proficiency'] })
export class Language {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  proficiency!: string;
}
