import { EntityManager } from '@mikro-orm/postgresql';
import { Inject, Injectable } from '@nestjs/common';

import { Person } from './entities/person.entity';
import { PersonCertificateRelation } from './entities/person-certificate-relation.entity';
import { PersonCountryRelation } from './entities/person-country-relation.entity';
import { PersonInterestRelation } from './entities/person-interest-relation.entity';
import { PersonSkillRelation } from './entities/person-skill-relation.entity';
import { Skill } from './entities/skill.entity';
import { Interest } from './entities/interest.entity';
import { Certificate } from './entities/certificate.entity';
import { Language } from './entities/language.entity';

export interface PersonListFilters {
  search?: string;
  industryId?: number;
  skillId?: number;
  interestId?: number;
  certificateId?: number;
  countryId?: number;
}

export interface PersonCursor {
  id: number;
}

@Injectable()
export class UserRepository {
  constructor(
    @Inject(EntityManager)
    private readonly entityManager: EntityManager,
  ) {}

  async findAll(filters: PersonListFilters = {}, cursor?: string, limit = 25) {
    const safeLimit = Math.min(Math.max(1, Number(limit) || 25), 100);

    const qb = this.entityManager.createQueryBuilder(Person, 'p').select('p.*');

    /*
     * Cursor pagination
     */
    if (cursor) {
      const cursorId = Number(cursor);

      if (Number.isFinite(cursorId)) {
        qb.andWhere({
          id: {
            $gt: cursorId,
          },
        });
      }
    }

    /*
     * Search
     */
    const search = filters.search?.trim();

    if (search) {
      qb.andWhere({
        $or: [
          { fullName: { $ilike: `%${search}%` } },
          { firstName: { $ilike: `%${search}%` } },
          { lastName: { $ilike: `%${search}%` } },
          { workMail: { $ilike: `%${search}%` } },
          { summary: { $ilike: `%${search}%` } },
        ],
      });
    }

    /*
     * Industry
     */
    if (filters.industryId) {
      qb.andWhere({
        industry: filters.industryId,
      });
    }

    /*
     * Skill
     */
    if (filters.skillId) {
      const subQuery = this.entityManager
        .createQueryBuilder(PersonSkillRelation, 'ps')
        .select('ps.person')
        .where({
          skill: filters.skillId,
        });

      qb.andWhere({
        id: {
          $in: subQuery,
        },
      });
    }

    /*
     * Interest
     */
    if (filters.interestId) {
      const subQuery = this.entityManager
        .createQueryBuilder(PersonInterestRelation, 'pi')
        .select('pi.person')
        .where({
          interest: filters.interestId,
        });

      qb.andWhere({
        id: {
          $in: subQuery,
        },
      });
    }

    /*
     * Certificate
     */
    if (filters.certificateId) {
      const subQuery = this.entityManager
        .createQueryBuilder(PersonCertificateRelation, 'pc')
        .select('pc.person')
        .where({
          certificate: filters.certificateId,
        });

      qb.andWhere({
        id: {
          $in: subQuery,
        },
      });
    }

    /*
     * Country
     */
    if (filters.countryId) {
      const subQuery = this.entityManager
        .createQueryBuilder(PersonCountryRelation, 'pco')
        .select('pco.person')
        .where({
          country: filters.countryId,
        });

      qb.andWhere({
        id: {
          $in: subQuery,
        },
      });
    }

    /*
     * Cursor pagination
     */
    qb.orderBy({
      id: 'asc',
    });

    qb.limit(safeLimit + 1);

    const rows = await qb.getResult();

    const hasNextPage = rows.length > safeLimit;

    const items = hasNextPage ? rows.slice(0, safeLimit) : rows;

    const nextCursor =
      hasNextPage && items.length > 0
        ? String(items[items.length - 1].id)
        : null;

    return {
      items,
      pagination: {
        hasNextPage,
        nextCursor,
      },
    };
  }

  findAllCertificates() {
    return this.entityManager.find(Certificate, {}, { fields: ['id', 'name'] });
  }

  findAllLanguages() {
    return this.entityManager.find(Language, {}, { fields: ['id', 'name'] });
  }

  findAllInterests() {
    return this.entityManager.find(
      Interest,
      {},
      { fields: ['id', 'interest'] },
    );
  }

  findAllSkills() {
    return this.entityManager.find(Skill, {}, { fields: ['id', 'skill'] });
  }
}
