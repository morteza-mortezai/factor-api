import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Certificate } from './entities/certificate.entity';
import { Interest } from './entities/interest.entity';
import { Language } from './entities/language.entity';
import { Person } from './entities/person.entity';
import { PersonCertificateRelation } from './entities/person-certificate-relation.entity';
import { PersonCountryRelation } from './entities/person-country-relation.entity';
import { PersonEmail } from './entities/person-email.entity';
import { PersonInterestRelation } from './entities/person-interest-relation.entity';
import { PersonLanguageRelation } from './entities/person-language-relation.entity';
import { PersonLocationNameRelation } from './entities/person-location-name-relation.entity';
import { PersonPhone } from './entities/person-phone.entity';
import { PersonSalary } from './entities/person-salary.entity';
import { PersonSkillRelation } from './entities/person-skill-relation.entity';
import { PersonSocialProfileRelation } from './entities/person-social-profile-relation.entity';
import { PersonStreetAddressLocationRelation } from './entities/person-street-address-location-relation.entity';
import { Skill } from './entities/skill.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Certificate,
      Interest,
      Language,
      Person,
      PersonCertificateRelation,
      PersonCountryRelation,
      PersonEmail,
      PersonInterestRelation,
      PersonLanguageRelation,
      PersonLocationNameRelation,
      PersonPhone,
      PersonSalary,
      PersonSkillRelation,
      PersonSocialProfileRelation,
      PersonStreetAddressLocationRelation,
      Skill,
    ]),
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService],
})
export class UserModule {}
