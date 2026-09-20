import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
  Cascade,
} from '@mikro-orm/core';
import { ulid } from 'ulid';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Tenant {
  @PrimaryKey()
  id = ulid();

  @Property()
  name!: string;

  @OneToMany(() => User, (user) => user.tenant, {
    cascade: [Cascade.PERSIST],
    orphanRemoval: true,
  })
  users = new Collection<User>(this);
}
