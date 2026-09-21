import {
  Entity,
  PrimaryKey,
  Property,
  Index,
  ManyToOne,
} from '@mikro-orm/core';
import { Tenant } from '../../tenant/entities/tenant.entity';

@Entity({ tableName: 'users' })
@Index({ properties: ['firstName', 'lastName'], name: 'idx_person_first_last' })
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  firstName!: string | null;

  @Property({ nullable: true })
  lastName!: string | null;

  @Property({ length: 11, type: 'string' })
  phone!: string;

  @Property({ default: true })
  gender!: boolean;

  @ManyToOne(() => Tenant, { deleteRule: 'cascade' })
  tenant!: Tenant;
}
