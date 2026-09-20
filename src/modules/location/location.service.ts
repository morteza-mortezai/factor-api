import { Injectable } from '@nestjs/common';
import { LocationRepository } from './location.repository';

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: LocationRepository) {}

  findAllCountries() {
    return this.locationRepository.findAllCountries();
  }

  findAllContinents() {
    return this.locationRepository.findAllContinents();
  }

  findAllLocalities() {
    return this.locationRepository.findAllLocalities();
  }

  findAllMetros() {
    return this.locationRepository.findAllMetros();
  }
}
