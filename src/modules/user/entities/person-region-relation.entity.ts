import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Unique,
} from '@mikro-orm/core';
import { Person } from './person.entity';
import { Region } from '../../location/entity/region.entity';

@Entity({ tableName: 'person_region_relation' })
@Unique({ properties: ['person', 'region'] })
export class PersonRegionRelation {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Person, { deleteRule: 'cascade' })
  person!: Person;

  @ManyToOne(() => Region, { deleteRule: 'restrict' })
  region!: Region;
}
