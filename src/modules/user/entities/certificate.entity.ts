import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity({ tableName: 'person_certificates' })
@Unique({ properties: ['name', 'proficiency'] })
export class Certificate {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  proficiency!: string;
}
