import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonModule } from './modules/pokemon/pokemon.module';
import { TeamModule } from './modules/team/team.module';
import { DatabaseModule } from './database/database.module';
import { ExternalModule } from './external/external.module';
import { HealthController } from './health.controller';

@Module({
  imports: [DatabaseModule, PokemonModule, TeamModule, ExternalModule],
  controllers: [HealthController],
})
export class AppModule {}
