import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend requests
  app.enableCors();

  // Set global API prefix (all routes start with /api)
  app.setGlobalPrefix('api');

  // Enable global validation pipes
  app.useGlobalPipes(new ValidationPipe());

  // Set up Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API for managing users')
    .setVersion('1.0')
    .addBearerAuth() // JWT authentication support
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log(`🚀 Application is running on: http://localhost:3000`);
  console.log(`📄 Swagger docs available at: http://localhost:3000/api/docs`);
}

bootstrap();
