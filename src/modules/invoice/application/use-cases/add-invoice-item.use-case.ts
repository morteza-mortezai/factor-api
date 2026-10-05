import { BadRequestException } from '@nestjs/common';
import { InvoiceRepository } from '../../domain/repository/invoice.repository';
import { InvoiceItem } from '../../domain/entities/invoice-item';

export class AddInvoiceItemUseCase {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async execute(input: {
    invoiceId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    discount: number;
  }) {
    const { invoiceId, productId, quantity, unitPrice, discount } = input;
    const invoice = await this.invoiceRepository.findById(invoiceId);

    if (!invoice) {
      throw new BadRequestException('invoice not found');
    }

    const item = new InvoiceItem(
      '123',
      productId,
      quantity,
      unitPrice,
      discount,
    );

    invoice.addItem(item);

    await this.invoiceRepository.save(invoice);
  }
}
