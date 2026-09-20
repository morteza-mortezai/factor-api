import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Unique,
} from '@mikro-orm/core';
import { Person } from './person.entity';
import { Language } from './language.entity';

@Entity({ tableName: 'person_languages_relation' })
@Unique({ properties: ['person', 'language'] })
export class PersonLanguageRelation {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Person, { deleteRule: 'cascade' })
  person!: Person;

  @ManyToOne(() => Language, { deleteRule: 'restrict' })
  language!: Language;
}
