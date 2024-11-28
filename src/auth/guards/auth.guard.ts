import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard as AuthGuardBase } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends AuthGuardBase('jwt') implements CanActivate {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
