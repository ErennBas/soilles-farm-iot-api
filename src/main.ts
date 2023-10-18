import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));

  if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "development") {
    const config = new DocumentBuilder()
      .setTitle('Topraksız Tarım IOT Sistemi')
      .setDescription('Topraksız Tarım IOT Sistemi API Swagger Dökümantasyonu')
      .setVersion('1.0')
      // .addBearerAuth({
      //   description: 'Enter the token with the `Bearer: ` prefix, e.g. "Bearer abcde12345".',
      //   type: 'http',
      //   in: 'header',
      //   scheme: 'bearer',
      //   bearerFormat: 'JWT',
      // },
      //   'defaultBearerAuth',
      // )
      .setExternalDoc('Postman Collection', '/swagger-json').build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER)); 
  await app.listen(3000);
}
bootstrap();
