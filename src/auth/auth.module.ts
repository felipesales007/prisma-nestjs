import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-strategy';
import { PrismaService } from 'src/prisma.servce';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [PassportModule, JwtModule],
  providers: [AuthService, UserService, JwtStrategy, PrismaService],
})
export class AuthModule {}
