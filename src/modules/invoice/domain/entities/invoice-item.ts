import { Money } from '../value-objects/money.vo';

export class InvoiceItem {
  constructor(
    readonly id: string,
    readonly productId: string,
    private quantity: number,
    private unitPrice: Money,
    private discount: Money,
  ) {
    this.validate();
  }

  toSnapshot() {
    return {
      id: this.id,
      productId: this.productId,
      quantity: this.quantity,
      unitPrice: this.unitPrice,
      discount: this.discount,
    };
  }

  get total(): number {
    return this.unitPrice.amount * (this.quantity - this.discount.amount);
  }

  get getDiscount(): number {
    return this.discount.amount;
  }

  changeQuantity(quantity: number): void {
    if (quantity <= 0) {
      throw new Error('Quantity can not be zero');
    }
    this.quantity = quantity;
  }

  changeUnitPrice(price: number): void {
    if (price < 0) {
      throw new Error('Price cannot be negative');
    }
    const moneyUnit = this.unitPrice.currency;
    this.unitPrice = Money.create(price, moneyUnit);
  }

  applyDiscount(discount: number): void {
    if (discount < 0) {
      throw new Error('Discount cannot be negative');
    }

    if (discount > this.quantity * this.unitPrice.amount) {
      throw new Error('Discount exceeds item value');
    }

    const discountUnit = this.discount.currency;
    this.discount = Money.create(discount, discountUnit);
  }

  private validate(): void {
    if (this.quantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }

    if (this.unitPrice.amount < 0) {
      throw new Error('Price cannot be negative');
    }

    if (this.discount.amount < 0) {
      throw new Error('Discount cannot be negative');
    }
  }
}
