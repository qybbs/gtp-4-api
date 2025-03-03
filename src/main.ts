import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { useContainer } from 'class-validator';
import { HttpExceptionFilter } from './common/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const logger = new Logger();
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.setGlobalPrefix('api', {
    exclude: [
      {
        path: 'auth/login',
        method: RequestMethod.POST,
      },
      {
        path: 'auth/register',
        method: RequestMethod.POST,
      },
    ],
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const config = new DocumentBuilder()
    .setTitle('GTP')
    .setDescription('GTP API Documentation')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  app.use(
    '/api/documentation',
    apiReference({
      spec: {
        content: documentFactory,
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
