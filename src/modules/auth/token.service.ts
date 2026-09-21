import { Injectable } from '@nestjs/common';
import { randomBytes, createHash } from 'node:crypto';
import { CreateAccessToken } from './interface/accessToken.interface';

@Injectable()
export class TokenService {
  createAccessToken({ tenantId, userId }: CreateAccessToken) {
    
  }

  generateRefreshToken() {
    return randomBytes(64).toString('hex');
  }

  hashRefreshToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
