import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'skills' })
export class Skill {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  skill!: string | null;
}
