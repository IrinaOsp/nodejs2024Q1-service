import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  BadRequestException,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { CustomLogger } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });

  const logger = app.get(CustomLogger);
  app.useLogger(logger);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        if (errors.find((error) => error.property === 'refreshToken')) {
          return new UnauthorizedException(errors);
        }
        return new BadRequestException(errors);
      },
    }),
  );

  const configService = app.get(ConfigService);
  logger.clearLogs(
    parseInt(configService.get('LOG_FILE_MAX_SIZE', '10485760')),
  );
  const port = parseInt(configService.get('PORT')) || 4000;
  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('REST API for Home Library Service')
    .setVersion('1.0')
    .addServer(`http://localhost:${port}`)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(port, () => {
    console.log(`Application is running on: ${port}`);
  });
}
bootstrap();
