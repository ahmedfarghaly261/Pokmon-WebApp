import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { TeamPokemon } from './entities/team-pokemon.entity';
import { Pokemon } from '../pokemon/entities/pokemon.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepo: Repository<Team>,
    @InjectRepository(TeamPokemon)
    private readonly tpRepo: Repository<TeamPokemon>,
    @InjectRepository(Pokemon)
    private readonly pokemonRepo: Repository<Pokemon>,
  ) {}

  async create(name: string, ownerToken?: string) {
    const t = this.teamRepo.create({ name, ownerToken });
    return this.teamRepo.save(t);
  }

  async findAll() {
    return this.teamRepo.find({ relations: ['pokemons', 'pokemons.pokemon'] });
  }

  async findOne(id: number) {
    const t = await this.teamRepo.findOne({ where: { id }, relations: ['pokemons', 'pokemons.pokemon'] });
    if (!t) throw new NotFoundException('Team not found');
    return t;
  }

  async addPokemon(teamId: number, pokemonId: number, slot: number) {
    const team = await this.findOne(teamId);
    if (team.pokemons.length >= 6) throw new BadRequestException('Team already has 6 pokemons');
    const p = await this.pokemonRepo.findOne({ where: { id: pokemonId } });
    if (!p) throw new NotFoundException('Pokemon not found');
    const tp = this.tpRepo.create({ team, pokemon: p, slot });
    return this.tpRepo.save(tp);
  }

  async removePokemon(teamId: number, teamPokemonId: number) {
    const tp = await this.tpRepo.findOne({ where: { id: teamPokemonId }, relations: ['team'] });
    if (!tp) throw new NotFoundException('Team Pokemon not found');
    if (tp.team.id !== teamId) throw new BadRequestException('Mismatched team');
    await this.tpRepo.delete(tp.id);
    return { ok: true };
  }

  async delete(teamId: number) {
    await this.teamRepo.delete(teamId);
    return { ok: true };
  }
}
