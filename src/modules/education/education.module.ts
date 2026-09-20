import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EducationController } from './education.controller';
import { EducationRepository } from './education.repository';
import { EducationService } from './education.service';
import { Degree } from './entity/degree.entity';
import { Education } from './entity/education.entity';
import { EducationDegreeRelation } from './entity/education-degree-relation.entity';
import { School } from './entity/school.entity';
import { SchoolType } from './entity/school-type.entity';
import { StudyField } from './entity/study-field.entity';
import { StudyFieldRelation } from './entity/study-field-relation.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Degree,
      Education,
      EducationDegreeRelation,
      School,
      SchoolType,
      StudyField,
      StudyFieldRelation,
    ]),
  ],
  controllers: [EducationController],
  providers: [EducationRepository, EducationService],
})
export class EducationModule {}
