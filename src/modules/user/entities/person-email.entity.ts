import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Person } from './person.entity';

@Entity({ tableName: 'person_emails' })
export class PersonEmail {
  @ManyToOne(() => Person, { deleteRule: 'cascade' })
  person!: Person;

  @PrimaryKey()
  id!: number;

  @Property()
  email!: string;

  @Property()
  type!: string;
}
