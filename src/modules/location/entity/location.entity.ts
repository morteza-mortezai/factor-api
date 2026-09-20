import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Index,
} from '@mikro-orm/core';
import { LocationName } from './location-name.entity';
import { Region } from './region.entity';
import { Country } from './country.entity';
import { County } from './county.entity';
import { Continent } from './continent.entity';
import { Locality } from './locality.entity';
import { Metro } from './metro.entity';

@Entity({ tableName: 'locations' })
@Index({ properties: ['region'], name: 'idx_location_region_id' })
@Index({ properties: ['country'], name: 'idx_location_country_id' })
@Index({ properties: ['county'], name: 'idx_location_county_id' })
@Index({ properties: ['continent'], name: 'idx_location_continent_id' })
@Index({ properties: ['locality'], name: 'idx_location_locality_id' })
@Index({ properties: ['metro'], name: 'idx_location_metro_id' })
export class Location {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => LocationName)
  name!: LocationName;

  @ManyToOne(() => Locality, { nullable: true })
  locality!: Locality | null;

  @ManyToOne(() => Metro, { nullable: true })
  metro!: Metro | null;

  @ManyToOne(() => Region)
  region!: Region;

  @Property({ nullable: true, columnType: 'point' })
  geo!: string | null;

  @ManyToOne(() => County)
  county!: County;

  @ManyToOne(() => Continent)
  continent!: Continent;

  @ManyToOne(() => Country)
  country!: Country;

  @Property({ nullable: true })
  streetAddress!: string | null;

  @Property({ nullable: true })
  addressLine2!: string | null;

  @Property({ nullable: true })
  postalCode!: string | null;
}
