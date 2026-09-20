import { EntityManager } from '@mikro-orm/core';
import { Inject } from '@nestjs/common';
import { Level } from './entities/level.entity';
import { Title } from './entities/title.entity';

export class JobRepository {
  constructor(
    @Inject(EntityManager)
    private readonly entityManager: EntityManager,
  ) {}

  findAllNames() {
    return this.entityManager.find(Title, {}, { fields: ['id', 'name'] });
  }

  findAllLevels() {
    return this.entityManager.find(Level, {}, { fields: ['id', 'level'] });
  }
}
