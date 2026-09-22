import { BadRequestException, Injectable } from '@nestjs/common';
import { RequestOtp } from '../dto/request-otp.dto';
import { randomInt } from 'crypto';
import { UtilService } from '../../util/util.service';
import { EntityManager } from '@mikro-orm/postgresql';
import { Otp } from '../entities/otp.entity';
import { ConfigService } from '@nestjs/config';
import { SmsService } from '../../notification/sms.service';
import { VerifyOtp } from '../dto/verify-otp.dto';
import { UserService } from '../../user/user.service';
import { TokenService } from './token.service';
import { TenantService } from '../../tenant/tenant.service';
import { Tenant } from '../../tenant/entities/tenant.entity';

@Injectable()
export class AuthService {
  private readonly expireSeconds: number;
  private readonly maxRetryCount = 3;

  constructor(
    private utilService: UtilService,
    private em: EntityManager,
    private configService: ConfigService,
    private smsService: SmsService,
    private userService: UserService,
    private tokenService: TokenService,
    private tenantService: TenantService,
  ) {
    this.expireSeconds =
      this.configService.getOrThrow<number>('OTP_EXPIRE_SECONDS');
  }

  async createAndSaveOtp(
    phone: string,
    tenant: Tenant,
  ): Promise<{ otp: string }> {
    const expireAt = new Date(Date.now() + this.expireSeconds * 1_000);

    const existingOtp = await this.em.findOne(Otp, {
      phone,
      tenant,
    });

    const otpIsValid = existingOtp && existingOtp.expireAt > new Date();

    if (existingOtp && otpIsValid) {
      return { otp: existingOtp.otp };
    }

    const otp = this.generateOtpCode();

    const otpRecord = this.em.create(Otp, {
      otp,
      phone,
      expireAt,
      tenant,
    });

    await this.em.persistAndFlush(otpRecord);

    return { otp };
  }

  async requestOtp(dto: RequestOtp) {
    const { phone, tenantName } = dto;
    const normalizedPhone = this.utilService.normalizePhone(phone);

    const { tenant } = await this.validateLoginParams(
      normalizedPhone,
      tenantName,
    );

    const { otp } = await this.createAndSaveOtp(normalizedPhone, tenant);

    await this.smsService.sendOtp(phone, otp);

    return { otp };
  }

  async verifyOtp(dto: VerifyOtp) {
    const { phone, otp, tenantName } = dto;

    const normalizedPhone = this.utilService.normalizePhone(phone);

    const { tenant, user } = await this.validateLoginParams(
      normalizedPhone,
      tenantName,
    );

    await this.validateOtp(normalizedPhone, otp, tenant);

    //2.create access and refresh token and set in cookie
    const { accessToken, refreshToken } = await this.tokenService.createTokens({
      userId: user.id,
      tenantId: tenant.id,
    });

    return { accessToken, refreshToken };
  }

  private async validateLoginParams(phone: string, tenantName: string) {
    const { tenant, user } = await this.tenantService.findByNameAndPhoneOrFail(
      phone,
      tenantName,
    );
    return { tenant, user };
  }

  private async validateOtp(phone: string, otp: string, tenant: Tenant) {
    const existingOtp = await this.em.findOne(Otp, {
      phone,
      otp,
      tenant,
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

    return true;
  }

  private generateOtpCode() {
    return randomInt(10_000, 100_000).toString();
  }
}
