import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserType } from '@shared/types/user.types';

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): UserType => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);