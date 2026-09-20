import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Unique,
} from '@mikro-orm/core';
import { Person } from './person.entity';
import { Interest } from './interest.entity';

@Entity({ tableName: 'person_interests_relation' })
@Unique({ properties: ['person', 'interest'] })
export class PersonInterestRelation {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Person, { deleteRule: 'cascade' })
  person!: Person;

  @ManyToOne(() => Interest, { deleteRule: 'restrict' })
  interest!: Interest;
}
