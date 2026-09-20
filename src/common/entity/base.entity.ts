import { PrimaryKey, Property } from '@mikro-orm/core';
import { ulid } from 'ulid';

export abstract class BaseEntity {
  @PrimaryKey({ type: 'string', columnType: 'char(26)' })
  id = ulid();

  @Property({ defaultRaw: 'now()', type: 'timestamp with time zone' })
  createdAt!: Date;
}
