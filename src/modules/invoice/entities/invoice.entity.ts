import { Entity, Property } from '@mikro-orm/core';

@Entity()
export class Invoice {
  @Property()
  dueDate!: Date;

  
}
