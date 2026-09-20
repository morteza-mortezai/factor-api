import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity({ tableName: 'study_fields' })
@Unique({ properties: ['name', 'type'] })
export class StudyField {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  type!: string;
}
