import { Controller, Post, Body, Res, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './provider/auth.service';
import { RequestOtp } from './dto/request-otp.dto';
import { VerifyOtp } from './dto/verify-otp.dto';
import { Signup } from './dto/sign-up.dto';
import type { Request, Response } from 'express';
import { AuthCookieService } from './provider/auth-cookie.service';
import { JwtAuthGuard } from './guards/auth.guard';
import type { AuthenticatedRequest } from './interface/auth.interface';
import { TokenService } from './provider/token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly authCookieService: AuthCookieService,
  ) {}

  @Post('request-code')
  requestOtp(@Body() dto: RequestOtp) {
    return this.authService.requestOtp(dto);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() dto: VerifyOtp, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.verifyOtp(dto);
    this.authCookieService.setAuthCookie(res, accessToken, refreshToken);
    return { message: 'Cookie set successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    const refreshtoken = req.cookies['refresh_token'];
    await this.tokenService.revokeRefreshToken(refreshtoken);
    this.authService.this.authCookieService.clearCookie(res);
    return { message: 'logout successfully' };
  }

  @Post('sign-up')
  signup(@Body() dto: Signup) {
    return this.authService.requestOtp(dto);
  }
}
