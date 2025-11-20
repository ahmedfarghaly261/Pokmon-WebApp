import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

async function run() {
  const arg = process.argv[2];
  if (!arg) {
    console.error('Usage: import:pokemon <id|name>');
    process.exit(1);
  }
  const app = await NestFactory.createApplicationContext(AppModule);
  const external = app.get('ExternalImportService');
  const pokemonService = app.get('PokemonService');
  const data = await external.fetchPokemonByIdOrName(arg);
  const mapped = external.mapPokeApiToInternal(data);
  const saved = await pokemonService.upsertFromImport(mapped);
  console.log('Imported:', saved.name);
  await app.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
