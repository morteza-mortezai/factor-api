export enum InvoiceStatusEnum {
  DRAFT = 'DRAFT',
  ISSUED = 'ISSUED',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export class InvoiceStatus {
  constructor(public readonly value: InvoiceStatusEnum) {}

  static draft() {
    return new InvoiceStatus(InvoiceStatusEnum.DRAFT);
  }
  static issued() {
    return new InvoiceStatus(InvoiceStatusEnum.ISSUED);
  }
  static paid() {
    return new InvoiceStatus(InvoiceStatusEnum.PAID);
  }
  static cancelled() {
    return new InvoiceStatus(InvoiceStatusEnum.CANCELLED);
  }

  isPaid(): boolean {
    return this.value === InvoiceStatusEnum.PAID;
  }
  isCancelled(): boolean {
    return this.value === InvoiceStatusEnum.CANCELLED;
  }
}
