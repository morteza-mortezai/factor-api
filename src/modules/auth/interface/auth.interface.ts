import { Request } from 'express';

export interface CreateAccessToken {
  userId: string;
  tenantId: string;
}

export interface UserPayload {
  sub: string;
  tenantId: string;
}

export interface AuthenticatedRequest extends Request {
  user: UserPayload;
}
