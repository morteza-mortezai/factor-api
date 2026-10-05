import { CurrencyEnum } from '../enum/currency.enum';
import { InvoiceItem } from './invoice-item';

export class Invoice {
  private items: InvoiceItem[] = [];
  constructor(
    private readonly id: string,
    private readonly tenantId: string,
    private readonly customerId: string,
    private readonly currency: CurrencyEnum,

    private issueDate: Date,
    private dueDate: Date,

    private notes: string | null = null,

    private subtotal: number = 0,
    private total: number = 0,
    private balance: number = 0,
    private discount: number = 0,
    private tax: number = 0,
    private paidAmount: number = 0,
  ) {}

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
