import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  try {
    // Try to read the initialized DataSource from the DI container
    const ds = app.get<DataSource>('DATA_SOURCE');
    if (ds) {
      if (ds.isInitialized) {
        console.log('Database connected:', (ds.options as any).database || 'unknown');
      } else {
        await ds.initialize();
        console.log('Database connected (initialized):', (ds.options as any).database || 'unknown');
      }
    } else {
      console.warn('DATA_SOURCE provider not found. Database connection status unknown.');
    }
  } catch (err) {
    console.error('Database connection error:', err);
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`\n🚀 Server running at http://localhost:${port}/api\n`);
}

bootstrap();
