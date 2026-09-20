import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'person_salaries' })
export class PersonSalary {
  @PrimaryKey()
  id!: number;

  @Property()
  salary!: string;
}
