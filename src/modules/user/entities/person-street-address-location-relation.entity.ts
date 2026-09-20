import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Unique,
} from '@mikro-orm/core';
import { Person } from './person.entity';
import { Location } from '../../location/entity/location.entity';

@Entity({ tableName: 'person_street_address_location_relation' })
@Unique({ properties: ['person', 'streetAddress'] })
export class PersonStreetAddressLocationRelation {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Person, { deleteRule: 'cascade' })
  person!: Person;

  @ManyToOne(() => Location, { deleteRule: 'restrict' })
  streetAddress!: Location;
}
