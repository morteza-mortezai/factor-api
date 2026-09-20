import { EntityManager } from '@mikro-orm/core';
import { Inject } from '@nestjs/common';
import { Continent } from './entity/continent.entity';
import { Country } from './entity/country.entity';
import { Locality } from './entity/locality.entity';
import { Metro } from './entity/metro.entity';

export class LocationRepository {
  constructor(
    @Inject(EntityManager)
    private readonly entityManager: EntityManager,
  ) {}

  findAllCountries(): Promise<Country[]> {
    return this.entityManager.find(Country, {}, { fields: ['id', 'name'] });
  }

  findAllContinents(): Promise<Continent[]> {
    return this.entityManager.find(Continent, {}, { fields: ['id', 'name'] });
  }

  findAllLocalities(): Promise<Locality[]> {
    return this.entityManager.find(Locality, {}, { fields: ['id', 'name'] });
  }

  findAllMetros(): Promise<Metro[]> {
    return this.entityManager.find(Metro, {}, { fields: ['id', 'name'] });
  }
}
