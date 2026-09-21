import { PrimaryKey, Property, OptionalProps } from '@mikro-orm/postgresql';
import { ulid } from 'ulid';

export abstract class BaseEntity {
  [OptionalProps]?: 'createdAt';

  @PrimaryKey({ type: 'string', columnType: 'char(26)' })
  id = ulid();

  @Property({ defaultRaw: 'now()', type: 'timestamptz' })
  createdAt = new Date();
}
