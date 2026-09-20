import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Unique,
} from '@mikro-orm/core';
import { LocationName } from '../../location/entity/location-name.entity';
import { Person } from './person.entity';

@Entity({ tableName: 'person_location_name_relation' })
@Unique({ properties: ['person', 'locationName'] })
export class PersonLocationNameRelation {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Person, { deleteRule: 'cascade' })
  person!: Person;

  @ManyToOne(() => LocationName, { deleteRule: 'restrict' })
  locationName!: LocationName;
}
