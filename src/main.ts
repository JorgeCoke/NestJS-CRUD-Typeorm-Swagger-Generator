import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .addBearerAuth('authorization', 'header')
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);

  // tslint:disable:no-console
  console.log('--> Server listening on port http://localhost:3000/');
  console.log('--> Swagger docs available on http://localhost:3000/api/docs');
}
bootstrap();
