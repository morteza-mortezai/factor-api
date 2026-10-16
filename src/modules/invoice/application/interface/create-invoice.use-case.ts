import { CurrencyEnum } from '../../domain/enum/currency.enum';

export interface CreateInvoiceUseCaseDTO {
  tenantId: string;
  items: CreateInvoiceItemDTO[];
  issueDate: Date;
  dueDate: Date;
  customerId: string;
  notes: string;
  currency: CurrencyEnum;
  taxPercent: number;
  discount: number;
}

export interface CreateInvoiceItemDTO {
  productId: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  currency: CurrencyEnum;
}
