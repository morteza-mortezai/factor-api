import { CurrencyEnum } from '../enum/currency.enum';
import { InvoiceId } from '../value-objects/invoice-id.vo';
import { InvoiceStatus } from '../value-objects/invoice-status.vo';
import { InvoiceItem } from './invoice-item';

export class Invoice {
  private _domainEvents: any[] = [];
  constructor(
    private readonly id: InvoiceId,
    private readonly tenantId: string,
    private readonly customerId: string,
    private readonly currency: CurrencyEnum,
    private items: InvoiceItem[],
    private issueDate: Date,
    private dueDate: Date,

    private status: InvoiceStatus,
    private notes: string | null = null,

    private subtotal: number = 0,
    private total: number = 0,
    private balance: number = 0,
    private discount: number = 0,
    private tax: number = 0,
    private paidAmount: number = 0,
  ) {}

  static create(
    customerId: string,
    tenantId: string,
    currency: CurrencyEnum,
    issueDate: Date,
    dueDate: Date,
    items: InvoiceItem[],
    taxPercent: number,
    notes: string | null = null,
  ) {
    if (items.length == 0) {
      throw new Error('Invoice must have at least on item !');
    }
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const discount = items.reduce((sum, item) => sum + item.getDiscount, 0);
    const grandTotal = subtotal - discount;
    const tax = taxPercent * grandTotal;
    const total = grandTotal + tax;
    const paidAmount = 0;
    const balance = total;

    const invoice = new Invoice(
      InvoiceId.create(),
      tenantId,
      customerId,
      currency,
      items,
      issueDate,
      dueDate,
      InvoiceStatus.draft(),
      notes,
      subtotal,
      total,
      balance,
      discount,
      tax,
      paidAmount,
    );

    // invoice.
    return invoice;
  }

  toSnapshot() {
    return {
      id: this.id,
      tenantId: this.tenantId,
      customerId: this.customerId,
      currency: this.currency,
      issueDate: this.issueDate,
      dueDate: this.dueDate,
      notes: this.notes,
      subtotal: this.subtotal,
      total: this.total,
      balance: this.balance,
      discount: this.discount,
      tax: this.tax,
      paidAmount: this.paidAmount,
      items: this.items.map((item) => item.toSnapshot()),
    };
  }

  addItem(item: InvoiceItem): void {
    this.items.push(item);
    this.recalculate();
  }
  removeItem(itemId: string) {
    const index = this.items.findIndex((item) => item.id === itemId);

    if (index === -1) {
      throw new Error('Invoice item not found');
    }

    this.items.splice(index, 1);

    this.recalculate();
  }
  private recalculate() {
    this.subtotal = this.items.reduce((sum, item) => sum + item.total, 0);

    this.total = this.subtotal - this.discount + this.tax;

    this.balance = this.total - this.paidAmount;
  }
  private recalculateTotals() {}
  private changeQuantity() {}
  private applyDiscount() {}
  private calculateSubtotal() {}
  private calculateTax() {}
  private recordPayment() {}
  private calculateBalance() {}
}
