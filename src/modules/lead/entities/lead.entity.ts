import { Entity, Property, Enum } from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entity/base.entity';
import { LeadStatus } from '../enum/lead-status.enum';

@Entity()
export class Lead extends BaseEntity {
  @Property({ type: 'string' })
  tenantId!: string;

  @Property({ type: 'string' })
  firstName!: string;

  @Property({ type: 'string' })
  lastName!: string;

  @Property({ type: 'string' })
  companyName!: string;

  @Property({ type: 'string' })
  email!: string;

  @Property({ type: 'string' })
  phone!: string;

  @Property({ type: 'string' })
  source!: string;

  @Enum(() => LeadStatus)
  status!: LeadStatus;
}
