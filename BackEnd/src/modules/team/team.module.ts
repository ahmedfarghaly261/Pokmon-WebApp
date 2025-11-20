import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TeamPokemon } from './entities/team-pokemon.entity';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Team, TeamPokemon, Pokemon])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
