import { IsNotEmpty, IsPhoneNumber, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtp {
  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('IR')
  phone!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tenantName!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{5}$/)
  otp!: string;
}
