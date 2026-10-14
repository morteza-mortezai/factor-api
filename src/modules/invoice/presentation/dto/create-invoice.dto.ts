import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { CurrencyEnum } from '../../domain/enum/currency.enum';

export class CreateInvoiceDto {
  @IsString()
  @IsNotEmpty()
  customerId!: string;

  @IsDateString()
  issueDate!: string;

  @IsDateString()
  dueDate!: string;

  @IsEnum(CurrencyEnum)
  currency!: CurrencyEnum;

  @IsOptional()
  @IsString()
  notes?: string;
}
