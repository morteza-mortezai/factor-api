import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Exprience } from './entities/exprience.entity';
import { ExprienceLocationNameRelation } from './entities/exprience-location-name-relation.entity';
import { Job } from './entities/job.entity';
import { JobLevelRelation } from './entities/job-level-relation.entity';
import { JobRoleRelation } from './entities/job-role-relation.entity';
import { Level } from './entities/level.entity';
import { Role } from './entities/role.entity';
import { Title } from './entities/title.entity';
import { JobController } from './job.controller';
import { JobRepository } from './job.repository';
import { JobService } from './job.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Exprience,
      ExprienceLocationNameRelation,
      Job,
      JobLevelRelation,
      JobRoleRelation,
      Level,
      Role,
      Title,
    ]),
  ],
  controllers: [JobController],
  providers: [JobRepository, JobService],
})
export class JobModule {}
