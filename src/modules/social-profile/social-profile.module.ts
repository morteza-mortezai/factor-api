import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SocialProfile } from './entities/social-profile.entity';

@Module({
  imports: [MikroOrmModule.forFeature([SocialProfile])],
  controllers: [],
  providers: [],
})
export class SocialProfileModule {}
