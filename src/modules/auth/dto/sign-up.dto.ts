import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Signup {
  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('IR')
  phone!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tenantName!: string;
}
