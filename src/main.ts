import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new AllExceptionsFilter());

    app.enableCors({
      origin: ['http://localhost:5173'],
      credentials: true,
    });

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');

    const port = process.env.PORT || 3001;
    await app.listen(port);

    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error('Application failed to start:', error);
    process.exit(1);
  }
}
bootstrap();
