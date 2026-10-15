import { CurrencyEnum } from '../enum/currency.enum';

export class Money {
  constructor(
    readonly amount: number,
    readonly currency: CurrencyEnum,
  ) {}

  static create(amount: number, currency: CurrencyEnum) {
    if (amount < 0) throw new Error('Amount cannot be negative');
    if (!currency) throw new Error('Currency is required');
    return new Money(amount, currency);
  }

  add(other: Money): Money {
    this.ensureSameCurrency(other);

    return new Money(this.amount + other.amount, this.currency);
  }

  subtract(other: Money): Money {
    this.ensureSameCurrency(other);

    const result = this.amount - other.amount;

    if (result < 0) {
      throw new Error('Result cannot be negative');
    }

    return new Money(result, this.currency);
  }

  multiply(quantity: number): Money {
    if (quantity < 0) {
      throw new Error('Quantity cannot be negative');
    }

    return new Money(this.amount * quantity, this.currency);
  }

  private ensureSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new Error('Currencies must match');
    }
  }
}
