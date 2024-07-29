import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobalMiddleware } from './middlewares/logger.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(LoggerGlobalMiddleware);

  const config = new DocumentBuilder()
  .setTitle('Coworking API')
  .setDescription('API documentation for Coworking ')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  // app.use(LoggerGlobalMiddleware);
  await app.listen(3000);
  console.log('Server listening on http://localhost:3000');
}
bootstrap();

