import { Controller, Get } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('countries')
  findAllCountries() {
    return this.locationService.findAllCountries();
  }

  @Get('continents')
  findAllContinents() {
    return this.locationService.findAllContinents();
  }

  @Get('localities')
  findAllLocalities() {
    return this.locationService.findAllLocalities();
  }

  @Get('metros')
  findAllMetros() {
    return this.locationService.findAllMetros();
  }
}
