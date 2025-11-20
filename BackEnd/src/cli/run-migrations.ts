import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../database/data-source';

async function runMigrations() {
  const dataSource = new DataSource(dataSourceOptions);
  try {
    await dataSource.initialize();
    console.log('Database connected');
    console.log('Running migrations...');
    await dataSource.runMigrations();
    console.log('✓ Migrations completed successfully');
    await dataSource.destroy();
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

runMigrations();
