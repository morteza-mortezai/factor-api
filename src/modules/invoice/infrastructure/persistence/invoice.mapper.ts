import { Collection } from '@mikro-orm/core';

import { Invoice } from '../../domain/entities/invoice';
import { InvoiceItem } from '../../domain/entities/invoice-item';
import { InvoiceOrm } from '../entities/invoice-orm.entity';
import { InvoiceItemOrm } from '../entities/invoice-item-orm.entity';

export class InvoiceMapper {
  static toDomain(entity: InvoiceOrm): Invoice {
    const invoice = new Invoice(
      entity.id,
      entity.tenantId,
      entity.customerId,
      entity.currency,
      entity.issueDate,
      entity.dueDate,
      entity.notes,
      entity.subtotal,
      entity.total,
      entity.balance,
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

  static toPersistence(invoice: Invoice): InvoiceOrm {
    const snapshot = invoice.toSnapshot();

    const entity = new InvoiceOrm();

    entity.id = snapshot.id.value;
    entity.tenantId = snapshot.tenantId;
    entity.customerId = snapshot.customerId;
    entity.currency = snapshot.currency;
    entity.issueDate = snapshot.issueDate;
    entity.dueDate = snapshot.dueDate;
    entity.notes = snapshot.notes;
    entity.subtotal = snapshot.subtotal;
    entity.total = snapshot.total;
    entity.balance = snapshot.balance;
    entity.discount = snapshot.discount;
    entity.tax = snapshot.tax;
    entity.paidAmount = snapshot.paidAmount;

    entity.items = new Collection<InvoiceItemOrm>(entity);

    for (const item of snapshot.items) {
      const itemEntity = new InvoiceItemOrm();

      itemEntity.id = item.id;
      itemEntity.productId = item.productId;
      itemEntity.quantity = item.quantity;
      itemEntity.unitPrice = item.unitPrice.amount;
      itemEntity.discount = item.discount.amount;
      // itemEntity.total = item.total;
      itemEntity.invoice = entity;

      entity.items.add(itemEntity);
    }

    return entity;
  }
}
