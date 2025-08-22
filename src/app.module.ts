import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleService } from './schedule/schedule.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [UserModule, AuthModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, ScheduleService],
})
export class AppModule {}
