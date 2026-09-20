import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Unique,
} from '@mikro-orm/core';
import { Person } from './person.entity';
import { SocialProfile } from '../../social-profile/entities/social-profile.entity';

@Entity({ tableName: 'person_social_profiles_relation' })
@Unique({ properties: ['person', 'profile'] })
export class PersonSocialProfileRelation {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Person, { deleteRule: 'cascade' })
  person!: Person;

  @ManyToOne(() => SocialProfile, { deleteRule: 'restrict' })
  profile!: SocialProfile;
}
