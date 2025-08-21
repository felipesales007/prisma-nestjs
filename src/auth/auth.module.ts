import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.auth';
import { PrismaService } from 'src/prisma.servce';

@Module({
  imports: [PassportModule, JwtModule],
  providers: [AuthService, UserService, LocalStrategy, PrismaService],
})
export class AuthModule {}
