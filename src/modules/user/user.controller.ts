import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { PersonListQueryDto } from './dto/users-list-query.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() filters: PersonListQueryDto) {
    return this.userService.findAll(filters);
  }

  @Get('certificates')
  findAllCertificates() {
    return this.userService.findAllCertificates();
  }

  @Get('languages')
  findAllLanguages() {
    return this.userService.findAllLanguages();
  }

  @Get('interests')
  findAllInterests() {
    return this.userService.findAllInterests();
  }

  @Get('skills')
  findAllSkills() {
    return this.userService.findAllSkills();
  }
}
