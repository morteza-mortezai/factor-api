import { EntityManager } from '@mikro-orm/core';
import { Inject } from '@nestjs/common';
import { Degree } from './entity/degree.entity';
import { School } from './entity/school.entity';
import { StudyField } from './entity/study-field.entity';

export class EducationRepository {
  constructor(
    @Inject(EntityManager)
    private readonly entityManager: EntityManager,
  ) {}

  findAllDegrees(): Promise<Degree[]> {
    return this.entityManager.find(Degree, {}, { fields: ['id', 'name'] });
  }

  findAllStudyFields() {
    return this.entityManager.find(StudyField, {}, { fields: ['id', 'name'] });
  }

  findAllSchools() {
    return this.entityManager.find(School, {}, { fields: ['id', 'name'] });
  }
}
