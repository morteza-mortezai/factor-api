import { CurrencyEnum } from '../../domain/enum/currency.enum';

export interface CreateInvoiceUseCaseDTO {
  tenantId: string;
  items: [];
  issueDate: Date;
  dueDate: Date;
  customerId: string;
  notes: string;
  currency: CurrencyEnum;
  subtotal: number;
  total: number;
  tax: number;
  discount: number;
}
