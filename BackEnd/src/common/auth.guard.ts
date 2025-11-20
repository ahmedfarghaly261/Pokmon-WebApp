import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const h = req.headers['authorization'] || req.headers['Authorization'];
    if (!h) throw new UnauthorizedException('Missing Authorization header');
    const parts = h.split(' ');
    if (parts.length !== 2) throw new UnauthorizedException('Invalid Authorization header');
    const token = parts[1];
    if (token !== (process.env.TEAM_API_TOKEN || 'SECRET123')) throw new UnauthorizedException('Invalid token');
    return true;
  }
}
