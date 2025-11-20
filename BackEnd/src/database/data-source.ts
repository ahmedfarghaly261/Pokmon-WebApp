import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { Pokemon } from '../modules/pokemon/entities/pokemon.entity';
import { PokemonType } from '../modules/pokemon/entities/pokemon-type.entity';
import { PokemonStat } from '../modules/pokemon/entities/pokemon-stat.entity';
import { Team } from '../modules/team/entities/team.entity';
import { TeamPokemon } from '../modules/team/entities/team-pokemon.entity';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '1620261620',
  database: process.env.DB_NAME || 'pokedex',
  entities: [Pokemon, PokemonType, PokemonStat, Team, TeamPokemon],
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  synchronize: false,
  logging: false
};
