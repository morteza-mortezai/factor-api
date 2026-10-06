import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from '../../domain/repository/invoice.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { Invoice } from '../../domain/entities/invoice';
import { InvoiceOrm } from '../entities/invoice-orm.entity';

@Injectable()
export class MikroOrmInvoiceRepository implements InvoiceRepository {
  constructor(private readonly em: EntityManager) {}

  async findById(invoiceId: string): Promise<Invoice | null> {
    const entity = await this.em.findOne(
      InvoiceOrm,
      { id: invoiceId },
      { populate: 'items' },
    );
    if (!entity) {
      return null;
    }
    return invvoiceMapper.toDomain(entity);
  }
  async save(invoice: Invoice): Promise<void> {
    const entity = InvoiceMapper.toPersistence(invoice);

    this.em.persist(entity);

    await this.em.flush();
  }
}
