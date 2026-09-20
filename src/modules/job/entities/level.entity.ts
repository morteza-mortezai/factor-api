import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'levels' })
export class Level {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  level!: string | null;
}
