import { EntityManager } from '@mikro-orm/postgresql';
import { Company } from './entities/company.entity';
import { Injectable } from '@nestjs/common';
import { CompanySize } from './entities/company-size.entity';

@Injectable()
export class CompanyRepository {
  constructor(private readonly entityManager: EntityManager) {}

  findAll23() {
    return this.entityManager.find(Company, {}, { fields: ['id', 'name'] });
  }

  findAllSizes() {
    return this.entityManager.find(CompanySize, {}, { fields: ['id', 'size'] });
  }
}
