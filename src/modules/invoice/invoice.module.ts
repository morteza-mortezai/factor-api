import { Module } from '@nestjs/common';
import { InvoiceController } from './presentation/invoice.controller';
import { MikroOrmInvoiceRepository } from './infrastructure/persistence/mikro-orm-invoice.repository';
import { INVOICE_REPOSITORY } from './domain/repository/invoice.tokens';

@Module({
  controllers: [InvoiceController],
  providers: [
    {
      useExisting: INVOICE_REPOSITORY,
      provide: MikroOrmInvoiceRepository,
    },
  ],
})
export class InvoiceModule {}
