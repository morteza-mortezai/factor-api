import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Index,
} from '@mikro-orm/core';
import { Person } from '../../user/entities/person.entity';
import { School } from './school.entity';

@Entity({ tableName: 'educations' })
@Index({ properties: ['person'], name: 'idx_education_person_id' })
@Index({ properties: ['school'], name: 'idx_education_school_id' })
@Index({ properties: ['start_date'], name: 'idx_education_start_date' })
@Index({ properties: ['end_date'], name: 'idx_education_end_date' })
@Index({ properties: ['gpa'], name: 'idx_education_gpa' })
export class Education {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Person, { deleteRule: 'cascade' })
  person!: Person;

  @ManyToOne(() => School, { nullable: true, deleteRule: 'set null' })
  school!: School | null;

  @Property({ nullable: true })
  start_date!: Date | null;

  @Property({ nullable: true })
  end_date!: Date | null;

  @Property({ nullable: true })
  gpa!: string | null;

  @Property({ nullable: true })
  summary!: string | null;
}
