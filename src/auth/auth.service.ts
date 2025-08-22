import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  //validar usuário
  async validarUsuario(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }
    if (user.password === password) {
      return await this.gerarToken(user);
    }
    throw new UnauthorizedException('Usuário ou Senha Inválidos');
  }

  //gerar JWT Token
  async gerarToken(payload: Prisma.UserCreateInput) {
    const accessToken = this.jwtService.sign(
      { email: payload.email },
      {
        secret: process.env.TOKEN_SECRET,
        expiresIn: process.env.TOKEN_EXPIRATION,
      },
    );

    const refreshToken = this.jwtService.sign(
      { email: payload.email },
      {
        secret: process.env.TOKEN_SECRET,
        expiresIn: process.env.TOKEN_EXPIRATION_REFRESH,
      },
    );
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async reautenticar(body) {
    const payload: Prisma.UserCreateInput =
      await this.verificarRefreshToken(body);
    return this.gerarToken(payload);
  }

  private async verificarRefreshToken(body) {
    const refreshToken = body.refresh_token;

    if (!refreshToken) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const email = this.jwtService.decode(refreshToken)['email'];
    const usuario = await this.userService.findOneByEmail(email);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    try {
      this.jwtService.verify(refreshToken, {
        secret: process.env.TOKEN_SECRET,
      });
      return usuario;
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Assinatura Inválida');
      }
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token Expirado');
      }
      throw new UnauthorizedException(err.name);
    }
  }
}
