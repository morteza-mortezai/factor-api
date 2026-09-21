import { PartialType } from '@nestjs/swagger';
import { RequestOtp } from './request-otp.dto';

export class UpdateAuthDto extends PartialType(RequestOtp) {}
