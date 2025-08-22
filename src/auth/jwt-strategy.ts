//jwt-strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UserService) {
    super({
      secretOrKey: 'topSecret512',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }
  async validate(payload: { email: string }): Promise<Prisma.UserCreateInput> {
    const { email } = payload;
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
