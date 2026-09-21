import { Injectable } from '@nestjs/common';
import { RequestOtp } from './dto/request-otp.dto';
import { randomInt } from 'crypto';
import { UtilService } from '../util/util.service';
import { EntityManager } from '@mikro-orm/postgresql';
import { Otp } from './entities/otp.entity';
import { ConfigService } from '@nestjs/config';
import { SmsService } from '../notification/sms.service';

@Injectable()
export class AuthService {
  private readonly expireSeconds: number;
  constructor(
    private utilService: UtilService,
    private em: EntityManager,
    private configService: ConfigService,
    private smsService: SmsService,
  ) {
    this.expireSeconds =
      this.configService.getOrThrow<number>('OTP_EXPIRE_SECONDS');
  }

  async requestOtp(dto: RequestOtp) {
    const { phone } = dto;
    const normalizedPhone = this.utilService.normalizePhone(phone);

    const otp = this.generateOtpCode();
    const expireAt = new Date(Date.now() + this.expireSeconds * 1_000);

    const existingOtp = await this.em.findOne(Otp, {
      otp,
      phone: normalizedPhone,
    });

    if (existingOtp && existingOtp.expireAt > new Date()) {
      return true;
    }

    //send sms
    await this.smsService.sendOtp(phone, otp);

    // save record
    const otpRecord = this.em.create(Otp, {
      otp,
      phone: normalizedPhone,
      expireAt,
    });

    await this.em.persistAndFlush(otpRecord);
    return true;
  }

  private generateOtpCode() {
    return randomInt(10_000, 100_000).toString();
  }
}
