import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() body) {
    return await this.authService.validarUsuario(body.email, body.password);
  }

  @Post('auth/refresh')
  async reautenticar(@Body() body) {
    return await this.authService.reautenticar(body);
  }
}
