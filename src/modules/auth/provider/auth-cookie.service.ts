import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EntityManager } from '@mikro-orm/postgresql';
import { Request, Response } from 'express';

@Injectable()
export class AuthCookieService {
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

  setAuthCookie(res: Response, accessToken: string, refreshToken: string) {
    const accessTokenMaxAge = this.accessTokenExpireMin * 60 * 1_000;
    const refreshTokenMaxAge =
      this.refreshTokenExpireDay * 24 * 60 * 60 * 1_000;

    res.cookie(
      'access_token',
      accessToken,
      this.cookieOptions(accessTokenMaxAge),
    );

    res.cookie(
      'refresh_token',
      refreshToken,
      this.cookieOptions(refreshTokenMaxAge),
    );
  }

  cookieOptions(maxAgeMS: number) {
    return {
      httpOnly: true,
      secure: this.configService.getOrThrow('node_env') === 'production',
      sameSite: 'lax' as const,
      maxAge: maxAgeMS,
      path: '/',
    };
  }

  clearCookie(res: Response) {
    res.clearCookie('access_token', {
      path: '/',
    });

    res.clearCookie('refresh_token', {
      path: '/auth',
    });
  }

  getAccessToken(req: Request): string | undefined {
    return req.cookies?.access_token;
  }
}
