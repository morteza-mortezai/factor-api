import { Invoice } from '../entities/invoice';

export interface InvoiceRepository {
  findById(invoiceId: string): Promise<Invoice | null>;
  save(invoice: Invoice): Promise<void>;
}
