import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  app.enableVersioning({
    type: VersioningType.URI
  });

  if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "development") {
    const config = new DocumentBuilder()
      .setTitle('Topraksız Tarım IOT Sistemi')
      .setDescription('Topraksız Tarım IOT Sistemi API Swagger Dökümantasyonu')
      .setVersion('1.0')
      .setExternalDoc('Postman Collection', '/swagger-json').build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }
  app.enableCors({ allowedHeaders: '*', origin: '*' });
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER)); 
  await app.listen(3000);
}
bootstrap();
