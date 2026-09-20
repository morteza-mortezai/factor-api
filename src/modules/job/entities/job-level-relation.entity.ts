import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Job } from './job.entity';
import { Level } from './level.entity';

@Entity({ tableName: 'job_level_relation' })
export class JobLevelRelation {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Job)
  job!: Job;

  @ManyToOne(() => Level)
  level!: Level;
}
