export class InvoiceMapper {
  static toDomain(entity: InvoiceOrmEntity): Invoice {
    const invoice = new Invoice(
      entity.id,
      entity.tenantId,
      entity.customerId,
      entity.currency,
      entity.issueDate,
      entity.dueDate,
      entity.notes,
      entity.discount,
      entity.tax,
      entity.paidAmount,
    );

    for (const item of entity.items.getItems()) {
      invoice.addItem(
        new InvoiceItem(
          item.id,
          item.productId,
          item.quantity,
          item.unitPrice,
          item.discount,
        ),
      );
    }

    return invoice;
  }

  static toPersistence(invoice: Invoice): InvoiceOrmEntity {
    // map domain → MikroORM
    // ...
  }
}
