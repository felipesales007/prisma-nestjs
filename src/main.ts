import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //uso global de interceptor, e a serialização dos dados nas requisições.
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.useStaticAssets(join(__dirname, '..', 'public')); //arquivos públicos
  app.setBaseViewsDir(join(__dirname, '..', 'views')); //views
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
