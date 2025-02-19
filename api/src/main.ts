import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get('CORS_ORIGIN') || '*', 

  });

  // app.setGlobalPrefix(configService.get('API_PREFIX') || 'api'); 
  

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true, 
  }));

  // Set up Swagger documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API for managing users and other resources')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument);

  app.setViewEngine('hbs');
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));

  await app.listen(configService.get('PORT') || 3000);
  console.log(`🚀 Application is running on: http://localhost:${configService.get('PORT') || 3000}`);
  console.log(`📄 Swagger docs available at: http://localhost:${configService.get('PORT') || 3000}/api/docs`);
}

bootstrap();
