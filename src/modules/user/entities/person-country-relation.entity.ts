import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Unique,
} from '@mikro-orm/core';
import { Country } from '../../location/entity/country.entity';
import { Person } from './person.entity';

@Entity({ tableName: 'person_countries_relation' })
@Unique({ properties: ['person', 'country'] })
export class PersonCountryRelation {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Person, { deleteRule: 'cascade' })
  person!: Person;

  @ManyToOne(() => Country, { deleteRule: 'restrict' })
  country!: Country;
}
