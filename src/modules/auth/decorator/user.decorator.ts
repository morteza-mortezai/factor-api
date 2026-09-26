import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedRequest } from '../interface/auth.interface';

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();

    return request.user;
  },
);
