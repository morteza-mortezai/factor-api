import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'interests' })
export class Interest {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  interest!: string | null;
}
