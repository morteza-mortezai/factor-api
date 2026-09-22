import { Injectable } from '@nestjs/common';
import { randomBytes, createHash } from 'node:crypto';
import { CreateAccessToken } from '../interface/accessToken.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EntityManager } from '@mikro-orm/postgresql';
import { RefreshToken } from '../entities/refresh-token.entity';

@Injectable()
export class TokenService {
  private readonly jwtSecret: string;
  private readonly accessTokenExpireMin: number;
  private readonly refreshTokenExpireDay: number;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private em: EntityManager,
  ) {
    this.jwtSecret = this.configService.getOrThrow<string>('JWT_SECRET');
    this.accessTokenExpireMin = this.configService.getOrThrow<number>(
      'JWT_ACCESS_EXPIRES_IN_MIN',
    );
    this.refreshTokenExpireDay = this.configService.getOrThrow<number>(
      'JWT_REFRESH_EXPIRES_IN_DAY',
    );
  }

  async createTokens(param: CreateAccessToken) {
    const { userId, tenantId } = param;
    const accessToken = this.createAccessToken(param);
    const { refreshToken } = await this.createAndStoreRefreshToken(
      userId,
      tenantId,
    );
    return { accessToken, refreshToken };
  }

  createAccessToken({ tenantId, userId }: CreateAccessToken) {
    const expiresInSeconds = this.accessTokenExpireMin * 60;
    return this.jwtService.sign(
      { tenantId, sub: userId },
      { expiresIn: expiresInSeconds },
    );
  }

  private generateRefreshToken() {
    return randomBytes(64).toString('hex');
  }

  async createAndStoreRefreshToken(userId: string, tenantId: string) {
    const hashedToken = this.hashRefreshToken(this.generateRefreshToken());

    const refreshTokenExpireMilliSeconds =
      this.refreshTokenExpireDay * 24 * 60 * 60 * 1000;

    const expireAt = new Date(Date.now() + refreshTokenExpireMilliSeconds);

    const refreshToken = this.em.create(RefreshToken, {
      hashedToken,
      tenant: tenantId,
      userId,
      expireAt,
    });

    await this.em.persistAndFlush(refreshToken);

    return { refreshToken };
  }

  private hashRefreshToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
