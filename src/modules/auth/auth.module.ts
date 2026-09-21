import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Otp } from './entities/otp.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { NotificationModule } from '../notification/notification.module';
import { UtilModule } from '../util/util.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UtilModule,
    NotificationModule,
    MikroOrmModule.forFeature([Otp, RefreshToken]),
  ],
})
export class AuthModule {}
