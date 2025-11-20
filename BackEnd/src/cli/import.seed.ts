import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import * as fs from 'fs';

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const pokemonService = app.get('PokemonService');
  const file = process.argv[2];
  if (!file) {
    console.error('Usage: import:seed <dump.json>');
    process.exit(1);
  }
  const content = fs.readFileSync(file, 'utf-8');
  const items = JSON.parse(content);
  for (const item of items) {
    await pokemonService.upsertFromImport(item);
    console.log(`Imported ${item.name}`);
  }
  await app.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
