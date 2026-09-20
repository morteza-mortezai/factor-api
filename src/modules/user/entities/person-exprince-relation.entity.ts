import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Unique,
} from '@mikro-orm/core';
import { Person } from './person.entity';
import { Exprience } from '../../job/entities/exprience.entity';

@Entity({ tableName: 'person_exprience_relation' })
@Unique({ properties: ['person', 'exprience'] })
export class PersonExprienceRelation {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Person, { deleteRule: 'cascade' })
  person!: Person;

  @ManyToOne(() => Exprience, { deleteRule: 'restrict' })
  exprience!: Exprience;
}
