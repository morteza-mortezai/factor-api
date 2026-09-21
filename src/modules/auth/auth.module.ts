import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Otp } from './entities/otp.entity';
import { RefreshToken } from './entities/refresh-token.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [MikroOrmModule.forFeature([Otp, RefreshToken])],
})
export class AuthModule {}
