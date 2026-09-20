import { Controller, Get } from '@nestjs/common';
import { EducationService } from './education.service';

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Get('degrees')
  findAllDegrees() {
    return this.educationService.findAllDegrees();
  }

  @Get('study-fields')
  findAllStudyFields() {
    return this.educationService.findAllStudyFields();
  }

  @Get('schools')
  findAllSchools() {
    return this.educationService.findAllSchools();
  }
}
