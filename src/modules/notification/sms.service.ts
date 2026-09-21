import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SmsService {
  private readonly apiKey: string;
  private readonly templateId: number;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.getOrThrow<string>('SMS_IR_API_KEY');

    this.templateId = this.configService.getOrThrow<number>(
      'SMS_IR_OTP_TEMPLATE_ID',
    );
  }

  async sendOtp(phone: string, otp: string): Promise<void> {
    return this.generalSendSms(phone, this.templateId, [
      {
        name: 'CODE',
        value: otp,
      },
    ]);
  }

  async generalSendSms(
    mobile: string,
    templateId: number,
    parameters: { name: string; value: string }[],
  ): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://api.sms.ir/v1/send/verify',
          {
            mobile,
            templateId,
            parameters,
          },
          {
            headers: {
              'X-API-KEY': this.apiKey,
            },
          },
        ),
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to send verification code',
      );
    }
  }
}
