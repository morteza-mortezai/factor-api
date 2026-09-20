import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'job_roles' })
export class Role {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  role!: string | null;
}
