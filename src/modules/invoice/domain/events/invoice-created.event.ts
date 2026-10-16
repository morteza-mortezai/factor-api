export class InvoiceCreatedEvent {
  constructor(
    public readonly invoiceId: string,
    public readonly customerId: string,
    public readonly total: number,
    public readonly occurredAt: Date = new Date(),
  ) {}
}
