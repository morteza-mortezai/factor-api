import { Injectable } from '@nestjs/common';
import { PersonListQueryDto } from './dto/users-list-query.dto';
import { UserRepository } from './user.repository';

export type UserListFilters = Record<
  string,
  string | number | boolean | undefined | null
>;

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findAllCertificates() {
    return this.userRepository.findAllCertificates();
  }

  findAllLanguages() {
    return this.userRepository.findAllLanguages();
  }

  findAllInterests() {
    return this.userRepository.findAllInterests();
  }

  findAllSkills() {
    return this.userRepository.findAllSkills();
  }

  findAll(filters: PersonListQueryDto) {
    const { cursor, limit, ...rest } = filters;
    return this.userRepository.findAll(rest, cursor, limit);
  }
}
