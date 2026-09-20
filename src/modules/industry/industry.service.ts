import { Injectable } from '@nestjs/common';
import { IndustryRepository } from './industry.repository';

@Injectable()
export class IndustryService {
  constructor(private readonly industryRepository: IndustryRepository) {}

  findAll() {
    return this.industryRepository.findAll();
  }
}
