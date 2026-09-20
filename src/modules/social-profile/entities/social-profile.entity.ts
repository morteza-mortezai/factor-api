import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'social_profiles' })
export class SocialProfile {
  @PrimaryKey()
  id!: number;

  @Property()
  network!: string;

  @Property({ nullable: true })
  url!: string | null;

  @Property({ nullable: true })
  userName!: string | null;

  @Property({ nullable: true })
  externalId!: string | null;

  @Property({ default: false })
  isDefault!: boolean;
}
