import { IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestOtp {
  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('IR')
  phone!: string;
}
