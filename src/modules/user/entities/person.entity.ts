import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  OneToMany,
  Index,
} from '@mikro-orm/core';
import { PersonSalary } from './person-salary.entity';
import { Industry } from '../../industry/entities/industry.entity';
import { Location } from '../../location/entity/location.entity';
import { Job } from '../../job/entities/job.entity';
import { PersonPhone } from './person-phone.entity';
import { PersonInterestRelation } from './person-interest-relation.entity';
import { PersonSkillRelation } from './person-skill-relation.entity';
import { PersonRegionRelation } from './person-region-relation.entity';
import { PersonCountryRelation } from './person-country-relation.entity';
import { PersonExprienceRelation } from './person-exprince-relation.entity';
import { Education } from '../../education/entity/education.entity';
import { PersonSocialProfileRelation } from './person-social-profile-relation.entity';
import { PersonLanguageRelation } from './person-language-relation.entity';
import { PersonEmail } from './person-email.entity';

@Entity({ tableName: 'people' })
@Index({ properties: ['firstName', 'lastName'], name: 'idx_person_first_last' })
@Index({ properties: ['fullName'], name: 'idx_person_full_name' })
@Index({ properties: ['gender'], name: 'idx_person_gender' })
@Index({ properties: ['birthYear'], name: 'idx_person_birth_year' })
@Index({ properties: ['birthDate'], name: 'idx_person_birth_date' })
@Index({ properties: ['workMail'], name: 'idx_person_workmail' })
@Index({ properties: ['location'], name: 'idx_person_location_id' })
@Index({ properties: ['industry'], name: 'idx_person_industry_id' })
export class Person {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  firstName!: string | null;

  @Property({ nullable: true })
  lastName!: string | null;

  @Property({ nullable: true })
  fullName!: string | null;

  @Property({ nullable: true, default: null })
  gender!: boolean | null;

  @Property({ nullable: true })
  middleInitial!: string | null;

  @Property({ nullable: true })
  middleName!: string | null;

  @Property({ nullable: true })
  birthYear!: string | null;

  @Property({ nullable: true })
  birthDate!: Date | null;

  @Property({ nullable: true })
  linkedinConnections!: string | null;

  @ManyToOne(() => PersonSalary, { nullable: true })
  inferredSalary!: PersonSalary | null;

  @Property({ nullable: true })
  inferredYearsExperience!: string | null;

  @Property({ nullable: true })
  summary!: string | null;

  @ManyToOne(() => Location, { nullable: true })
  location!: Location | null;

  @Property({ nullable: true })
  workMail?: string | null;

  @ManyToOne(() => Industry, { deleteRule: 'restrict' })
  industry!: Industry;

  @ManyToOne(() => Job, { nullable: true })
  job!: Job | null;

  @OneToMany(() => PersonPhone, (phone) => phone.person)
  phones!: PersonPhone[];

  @OneToMany(() => PersonEmail, (email) => email.person)
  emails!: PersonEmail[];

  @OneToMany(() => PersonInterestRelation, (relation) => relation.person)
  interests!: PersonInterestRelation[];

  @OneToMany(() => PersonSkillRelation, (relation) => relation.person)
  skills!: PersonSkillRelation[];

  @OneToMany(() => PersonRegionRelation, (relation) => relation.person)
  regions!: PersonRegionRelation[];

  @OneToMany(() => PersonCountryRelation, (relation) => relation.person)
  countries!: PersonCountryRelation[];

  @OneToMany(() => PersonExprienceRelation, (relation) => relation.person)
  exprince!: PersonExprienceRelation[];

  @OneToMany(() => Education, (education) => education.person)
  education!: Education[];

  @OneToMany(() => PersonSocialProfileRelation, (relation) => relation.person)
  profiles!: PersonSocialProfileRelation[];

  @OneToMany(() => PersonLanguageRelation, (relation) => relation.person)
  languages!: PersonLanguageRelation[];
}
