import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'titles' })
export class Title {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  name!: string | null;
}
