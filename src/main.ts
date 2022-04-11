import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { readFileSync } from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync(`${process.cwd()}/local_ssl/localhost.key`),
    cert: readFileSync(`${process.cwd()}/local_ssl/localhost.crt`),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.enableCors({
    origin: 'https://127.0.0.1:3000',
    credentials: true
  });
  app.use(cookieParser());
  app.setGlobalPrefix('/api/v1');

  await app.listen(8080);
}
bootstrap();
