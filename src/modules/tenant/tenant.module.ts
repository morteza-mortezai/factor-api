import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Tenant } from './entities/tenant.entity';

@Module({
  controllers: [TenantController],
  providers: [TenantService],
  imports: [MikroOrmModule.forFeature([Tenant])],
})
export class TenantModule {}
