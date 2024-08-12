import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobalMiddleware } from './middlewares/logger.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(LoggerGlobalMiddleware);

  app.useGlobalPipes(new ValidationPipe({ whitelist:true}))

  // Configuración de CORS
  app.enableCors({
    origin: '*', // Ajusta esto según los dominios permitidos
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Si necesitas enviar cookies o autenticación HTTP
  });

  const config = new DocumentBuilder()
    .setTitle('Coworking API')
    .setDescription('API documentation for Coworking ')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;

  app.listen(port)
    .then(() => {
      console.log(`Server listening on http://localhost:${port}`);
    })
    .catch(async (error) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`Port ${port} is in use, trying port 3002...`);
        await app.listen(3002);
        console.log('Server listening on http://localhost:3002');
      } else {
        console.error('Error starting server:', error);
      }
    });
}

bootstrap();
