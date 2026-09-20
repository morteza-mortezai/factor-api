import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { SchoolType } from './school-type.entity';
import { Location } from '../../location/entity/location.entity';

@Entity({ tableName: 'schools' })
export class School {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @ManyToOne(() => SchoolType, { nullable: true, deleteRule: 'set null' })
  type!: SchoolType | null;

  @Property({ nullable: true })
  linkedin_url!: string | null;

  @Property({ nullable: true })
  facebook_url!: string | null;

  @Property({ nullable: true })
  twitter_url!: string | null;

  @Property({ nullable: true })
  linkedin_id!: string | null;

  @Property({ nullable: true })
  website!: string | null;

  @Property({ nullable: true })
  domain!: string | null;

  @ManyToOne(() => Location, { nullable: true, deleteRule: 'set null' })
  location!: Location | null;
}
