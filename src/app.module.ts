import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { envValidationSchema } from './config/env.validation';
import { appConfig } from './config/app.config';
import { mikroOrmConfig } from './config/mikro-orm.config';
import { EducationModule } from './modules/education/education.module';
import { JobModule } from './modules/job/job.module';
import { CompanyModule } from './modules/company/company.module';
import { LocationModule } from './modules/location/location.module';
import { SocialProfileModule } from './modules/social-profile/social-profile.module';
import { IndustryModule } from './modules/industry/industry.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
      load: [appConfig],
      validationOptions: {
        libraryOptions: {
          abortEarly: true,
        },
      },
    }),

    UserModule,
    MikroOrmModule.forRootAsync(mikroOrmConfig),
    EducationModule,
    JobModule,
    CompanyModule,
    LocationModule,
    SocialProfileModule,
    IndustryModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
