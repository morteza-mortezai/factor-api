import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Unique,
} from '@mikro-orm/core';
import { Degree } from './degree.entity';
import { Education } from './education.entity';

@Entity({ tableName: 'education_degrees_relation' })
@Unique({ properties: ['education', 'degree'] })
export class EducationDegreeRelation {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Education, { deleteRule: 'cascade' })
  education!: Education;

  @ManyToOne(() => Degree, { deleteRule: 'restrict' })
  degree!: Degree;
}
