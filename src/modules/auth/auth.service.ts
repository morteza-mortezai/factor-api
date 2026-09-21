import { BadRequestException, Injectable } from '@nestjs/common';
import { RequestOtp } from './dto/request-otp.dto';
import { randomInt } from 'crypto';
import { UtilService } from '../util/util.service';
import { EntityManager } from '@mikro-orm/postgresql';
import { Otp } from './entities/otp.entity';
import { ConfigService } from '@nestjs/config';
import { SmsService } from '../notification/sms.service';
import { VerifyOtp } from './dto/verify-otp.dto';

@Injectable()
export class AuthService {
  private readonly expireSeconds: number;
  private readonly maxRetryCount = 3;

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

  async verifyOtp(dto: VerifyOtp) {
    const { phone, otp } = dto;

    const normalizedPhone = this.utilService.normalizePhone(phone);

    const existingOtp = await this.em.findOne(Otp, {
      phone: normalizedPhone,
      otp,
    });

    if (!existingOtp) {
      throw new BadRequestException('Otp Not Found Please try again!');
    }

    const otpExpired = new Date() > existingOtp.expireAt;

    if (!otpExpired) {
      // delete exiting
      await this.em.removeAndFlush(existingOtp);
      throw new BadRequestException('Otp is Expired Please request again!');
    }

    if (existingOtp.retryCount > this.maxRetryCount) {
      // delete exiting
      await this.em.removeAndFlush(existingOtp);
      throw new BadRequestException(
        'You can not input wrong more than three times',
      );
    }

    if (otp !== existingOtp.otp) {
      throw new BadRequestException('inputed otp code is wrong!');
    }

    //2.create access and refresh token and set in cookie
  }

  private generateOtpCode() {
    return randomInt(10_000, 100_000).toString();
  }
}
