import { Injectable } from '@nestjs/common';
import { PersonListQueryDto } from './dto/users-list-query.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findAll(filters: PersonListQueryDto) {
    const { cursor, limit, ...rest } = filters;
    return this.userRepository.findAll(rest, cursor, limit);
  }
}
