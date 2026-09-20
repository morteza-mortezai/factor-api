import { Controller, Get } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get('names')
  findAllNames() {
    return this.jobService.findAllNames();
  }

  @Get('levels')
  findAllLevels() {
    return this.jobService.findAllLevels();
  }
}
