import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';

import { Industry } from './entities/industry.entity';

@Injectable()
export class IndustryRepository {
  constructor(private readonly entityManager: EntityManager) {}

  findAll(): Promise<Industry[]> {
    return this.entityManager.find(
      Industry,
      {},
      {
        fields: ['id', 'name'],
      },
    );
  }
}
