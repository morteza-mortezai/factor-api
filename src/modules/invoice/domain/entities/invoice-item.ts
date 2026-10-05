export class InvoiceItem {
  constructor(
    readonly id: string,
    readonly productId: string,
    private quantity: number,
    private unitPrice: number,
    private discount: number,
  ) {
    this.validate();
  }

  get total(): number {
    return this.unitPrice * (this.quantity - this.discount);
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

    this.unitPrice = price;
  }

  applyDiscount(discount: number): void {
    if (discount < 0) {
      throw new Error('Discount cannot be negative');
    }

    if (discount > this.quantity * this.unitPrice) {
      throw new Error('Discount exceeds item value');
    }

    this.discount = discount;
  }

  private validate(): void {
    if (this.quantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }

    if (this.unitPrice < 0) {
      throw new Error('Price cannot be negative');
    }

    if (this.discount < 0) {
      throw new Error('Discount cannot be negative');
    }
  }
}
