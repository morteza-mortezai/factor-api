import { Injectable } from '@nestjs/common';
import { JobRepository } from './job.repository';

@Injectable()
export class JobService {
  constructor(private readonly jobRepository: JobRepository) {}

  findAllNames() {
    return this.jobRepository.findAllNames();
  }

  findAllLevels() {
    return this.jobRepository.findAllLevels();
  }
}
