import { Entity, PrimaryKey, Property, Index } from '@mikro-orm/core';

@Entity({ tableName: 'people' })
@Index({ properties: ['firstName', 'lastName'], name: 'idx_person_first_last' })
@Index({ properties: ['fullName'], name: 'idx_person_full_name' })
@Index({ properties: ['gender'], name: 'idx_person_gender' })
export class Person {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  firstName!: string | null;

  @Property({ nullable: true })
  lastName!: string | null;

  @Property({ nullable: true })
  fullName!: string | null;

  @Property({ nullable: true, default: null })
  gender!: boolean | null;
}
