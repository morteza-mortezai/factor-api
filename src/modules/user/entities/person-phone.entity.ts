import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Person } from './person.entity';

@Entity({ tableName: 'person_phones' })
export class PersonPhone {
  @ManyToOne(() => Person, { deleteRule: 'cascade' })
  person!: Person;

  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  phone!: string | null;
}
