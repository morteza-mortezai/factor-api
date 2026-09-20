import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { IndustryController } from './industry.controller';
import { IndustryRepository } from './industry.repository';
import { IndustryService } from './industry.service';
import { Industry } from './entities/industry.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Industry])],
  controllers: [IndustryController],
  providers: [IndustryRepository, IndustryService],
})
export class IndustryModule {}
