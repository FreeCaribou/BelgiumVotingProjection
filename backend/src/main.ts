import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { mockData } from './mock-data';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );
  await app.listen(1979);

  if (process.env.NODE_ENV == 'dev' || process.env.NODE_ENV == 'test') {
    await mockData();
    console.log('DB Init ok');
  }
}
bootstrap();
