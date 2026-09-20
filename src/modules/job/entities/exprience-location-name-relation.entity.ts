import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Unique,
} from '@mikro-orm/core';
import { Exprience } from './exprience.entity';
import { LocationName } from '../../location/entity/location-name.entity';

@Entity({ tableName: 'exprience_location_name_relation' })
@Unique({ properties: ['exprience', 'locationName'] })
export class ExprienceLocationNameRelation {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Exprience, { deleteRule: 'cascade' })
  exprience!: Exprience;

  @ManyToOne(() => LocationName, { deleteRule: 'restrict' })
  locationName!: LocationName;
}
