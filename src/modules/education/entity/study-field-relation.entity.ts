import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Unique,
} from '@mikro-orm/core';
import { Education } from './education.entity';
import { StudyField } from './study-field.entity';

@Entity({ tableName: 'education_study_fields_relation' })
@Unique({ properties: ['education', 'studyField', 'type'] })
export class StudyFieldRelation {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Education, { deleteRule: 'cascade' })
  education!: Education;

  @ManyToOne(() => StudyField, { deleteRule: 'restrict' })
  studyField!: StudyField;

  @Property()
  type!: string;
}
