import { Inject, Injectable } from '@nestjs/common';
import { CreateInvoiceUseCaseDTO } from '../interface/create-invoice.use-case';
import { MikroOrmInvoiceRepository } from '../../infrastructure/persistence/mikro-orm-invoice.repository';
import { INVOICE_REPOSITORY } from '../../domain/repository/invoice.tokens';
import { Invoice } from '../../domain/entities/invoice';
import { InvoiceItem } from '../../domain/entities/invoice-item';
import { InvoiceId } from '../../domain/value-objects/invoice-id.vo';
import { Money } from '../../domain/value-objects/money.vo';

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
      dueDate,
      issueDate,
      items,
      notes,
      taxPercent,
      tenantId,
    } = params;

    // 1. check if customer exist
    // 2. check if product exist
    // 2. in transaction create invoice + items

    const lines = items.map(
      (item) =>
        new InvoiceItem(
          InvoiceId.create().value,
          item.productId,
          item.quantity,
          Money.create(item.unitPrice, item.currency),
          Money.create(item.discount, item.currency),
        ),
    );

    const invoice = Invoice.create(
      customerId,
      tenantId,
      currency,
      issueDate,
      dueDate,
      lines,
      taxPercent,
      notes,
    );

    await this.invoiceRepository.save(invoice);

    return invoice;
  }
}
