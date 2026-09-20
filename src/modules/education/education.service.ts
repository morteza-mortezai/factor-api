import { Injectable } from '@nestjs/common';
import { EducationRepository } from './education.repository';

@Injectable()
export class EducationService {
  constructor(private readonly educationRepository: EducationRepository) {}

  findAllDegrees() {
    return this.educationRepository.findAllDegrees();
  }

  findAllStudyFields() {
    return this.educationRepository.findAllStudyFields();
  }

  findAllSchools() {
    return this.educationRepository.findAllSchools();
  }
}
