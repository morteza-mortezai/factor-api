import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Company } from './entities/company.entity';
import { CompanySize } from './entities/company-size.entity';
import { CompanySocialProfileRelation } from './entities/company-social-profile-relation.entity';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';
import { CompanyService } from './company.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Company,
      CompanySize,
      CompanySocialProfileRelation,
    ]),
  ],
  controllers: [CompanyController],
  providers: [CompanyRepository, CompanyService],
})
export class CompanyModule {}
