import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Customer } from './entities/customer.entity';
import { Individual } from './entities/individual.entity';
import { Company } from './entities/company.entity';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
  imports: [MikroOrmModule.forFeature([Customer, Individual, Company])],
})
export class CustomerModule {}
