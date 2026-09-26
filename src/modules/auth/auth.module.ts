import { Module } from '@nestjs/common';
import { AuthService } from './provider/auth.service';
import { AuthController } from './auth.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Otp } from './entities/otp.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { NotificationModule } from '../notification/notification.module';
import { UtilModule } from '../util/util.module';
import { TokenService } from './provider/token.service';
import { TenantModule } from '../tenant/tenant.module';
import { AuthCookieService } from './provider/auth-cookie.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenService, AuthCookieService],
  imports: [
    UtilModule,
    NotificationModule,
    MikroOrmModule.forFeature([Otp, RefreshToken]),
    TenantModule,
  ],
})
export class AuthModule {}
