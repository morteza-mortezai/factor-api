import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Unique,
  Index,
} from '@mikro-orm/core';
import { SocialProfile } from '../../social-profile/entities/social-profile.entity';
import { Company } from './company.entity';

@Entity({ tableName: 'company_social_profiles_relation' })
@Unique({ properties: ['company', 'profile'] })
@Index({ properties: ['company'], name: 'idx_csp_company_id' })
@Index({ properties: ['profile'], name: 'idx_csp_profile_id' })
export class CompanySocialProfileRelation {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Company, { deleteRule: 'cascade' })
  company!: Company;

  @ManyToOne(() => SocialProfile, { deleteRule: 'restrict' })
  profile!: SocialProfile;
}
