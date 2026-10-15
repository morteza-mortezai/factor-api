import { ulid } from 'ulid';

export class InvoiceId {
  constructor(public readonly value: string) {}

  static create(): InvoiceId {
    return new InvoiceId(ulid());
  }

  static from(value: string): InvoiceId {
    return new InvoiceId(value);
  }

  equals(other: InvoiceId) {
    return this.value == other.value;
  }
}
