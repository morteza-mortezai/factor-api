import { ConfigModule, ConfigService } from '@nestjs/config';

export const jwtConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],

  useFactory: (config: ConfigService) => ({
    secret: config.getOrThrow<string>('JWT_SECRET'),
  }),
};
