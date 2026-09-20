import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Job } from './job.entity';
import { Role } from './role.entity';

@Entity({ tableName: 'job_role_relation' })
export class JobRoleRelation {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Job)
  job!: Job;

  @ManyToOne(() => Role)
  role!: Role;
}
