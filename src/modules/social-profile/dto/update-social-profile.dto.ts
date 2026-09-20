import { PartialType } from '@nestjs/swagger';
import { CreateSocialProfileDto } from './create-social-profile.dto';

export class UpdateSocialProfileDto extends PartialType(
  CreateSocialProfileDto,
) {}
