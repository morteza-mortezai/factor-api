import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Unique,
} from '@mikro-orm/core';
import { Person } from './person.entity';
import { Skill } from './skill.entity';

@Entity({ tableName: 'person_skill_relation' })
@Unique({ properties: ['person', 'skill'] })
export class PersonSkillRelation {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Person, { deleteRule: 'cascade' })
  person!: Person;

  @ManyToOne(() => Skill, { deleteRule: 'restrict' })
  skill!: Skill;
}
