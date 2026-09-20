import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Continent } from './entity/continent.entity';
import { Country } from './entity/country.entity';
import { County } from './entity/county.entity';
import { Locality } from './entity/locality.entity';
import { Location } from './entity/location.entity';
import { LocationName } from './entity/location-name.entity';
import { Metro } from './entity/metro.entity';
import { Region } from './entity/region.entity';
import { LocationController } from './location.controller';
import { LocationRepository } from './location.repository';
import { LocationService } from './location.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Continent,
      Country,
      County,
      Locality,
      Location,
      LocationName,
      Metro,
      Region,
    ]),
  ],
  controllers: [LocationController],
  providers: [LocationRepository, LocationService],
})
export class LocationModule {}
