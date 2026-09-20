import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Unique,
} from '@mikro-orm/core';
import { Person } from './person.entity';
import { Certificate } from './certificate.entity';

@Entity({ tableName: 'person_certificate_relation' })
@Unique({ properties: ['person', 'certificate'] })
export class PersonCertificateRelation {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Person, { deleteRule: 'cascade' })
  person!: Person;

  @ManyToOne(() => Certificate, { deleteRule: 'restrict' })
  certificate!: Certificate;
}
