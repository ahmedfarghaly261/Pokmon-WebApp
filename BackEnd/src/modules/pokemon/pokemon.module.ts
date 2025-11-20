import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonType } from './entities/pokemon-type.entity';
import { PokemonStat } from './entities/pokemon-stat.entity';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon, PokemonType, PokemonStat])],
  controllers: [PokemonController],
  providers: [PokemonService],
  exports: [PokemonService]
})
export class PokemonModule {}
