import { Inject, Injectable } from '@nestjs/common';
import { CreateInvoiceUseCaseDTO } from '../interface/create-invoice.use-case';
import { MikroOrmInvoiceRepository } from '../../infrastructure/persistence/mikro-orm-invoice.repository';
import { INVOICE_REPOSITORY } from '../../domain/repository/invoice.tokens';
import { Invoice } from '../../domain/entities/invoice';
import { CurrencyEnum } from '../../domain/enum/currency.enum';

@Injectable()
export class CreateInvoiceUseCase {
  constructor(
    @Inject(INVOICE_REPOSITORY)
    private readonly invoiceRepository: MikroOrmInvoiceRepository,
  ) {}
  async execute(params: CreateInvoiceUseCaseDTO) {
    const {
      currency,
      customerId,
      discount,
      dueDate,
      issueDate,
      items,
      notes,
      subtotal,
      tax,
      tenantId,
      total,
    } = params;

    // 1. check if customer exist
    // 2. check if product exist
    // 2. in transaction create invoice + items

    const invoice = new Invoice(
      '1',
      tenantId,
      customerId,
      currency,
      issueDate,
      dueDate,
      notes,
    );

    await this.invoiceRepository.save(invoice);

    return invoice;
  }
}
