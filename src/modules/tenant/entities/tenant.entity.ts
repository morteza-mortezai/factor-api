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

  @Property({ nullable: true })
  logo!: string | null;

  @Property({ nullable: true })
  address!: string | null;

  @Property({ nullable: true })
  email!: string | null;

  @Property({ nullable: true })
  website!: string | null;

  @OneToMany(() => User, (user) => user.tenant, {
    cascade: [Cascade.PERSIST],
    orphanRemoval: true,
  })
  users = new Collection<User>(this);
}
