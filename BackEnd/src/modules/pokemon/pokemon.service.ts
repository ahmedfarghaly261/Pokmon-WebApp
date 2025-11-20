import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonType } from './entities/pokemon-type.entity';
import { PokemonStat } from './entities/pokemon-stat.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepo: Repository<Pokemon>,
    @InjectRepository(PokemonType)
    private readonly typeRepo: Repository<PokemonType>,
    @InjectRepository(PokemonStat)
    private readonly statRepo: Repository<PokemonStat>,
  ) {}

  async findAll(q?: string, page = 1, limit = 20) {
    const qb = this.pokemonRepo.createQueryBuilder('p').leftJoinAndSelect('p.types', 't');
    if (q) {
      qb.where('p.name ILIKE :q', { q: `%${q}%` });
    }
    qb.skip((page - 1) * limit).take(limit).orderBy('p.id', 'ASC');
    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, limit };
  }

  async findOne(id: number) {
    const p = await this.pokemonRepo.findOne({ where: { id }, relations: ['types', 'stats'] });
    if (!p) throw new NotFoundException('Pokemon not found');
    return p;
  }

  // Called by import CLI services
  async upsertFromImport(payload: Partial<Pokemon>): Promise<Pokemon> {
    // Create or update pokemon by name or externalId
    let existing: Pokemon = null;
    if (payload.externalId) {
      existing = await this.pokemonRepo.findOne({ where: { externalId: payload.externalId }, relations: ['types', 'stats'] });
    }
    if (!existing && payload.name) {
      existing = await this.pokemonRepo.findOne({ where: { name: payload.name } , relations: ['types', 'stats']});
    }

    const types = [];
    if (payload.types && payload.types.length) {
      for (const t of payload.types as PokemonType[]) {
        let found = await this.typeRepo.findOne({ where: { name: t.name } });
        if (!found) found = this.typeRepo.create({ name: t.name });
        types.push(found);
      }
    }

    if (existing) {
      Object.assign(existing, payload);
      existing.types = types;
      const saved = await this.pokemonRepo.save(existing);
      // replace stats
      if (payload.stats) {
        await this.statRepo.delete({ pokemon: { id: saved.id } } as any);
        const stats = payload.stats.map(s => this.statRepo.create({ name: s.name, base: s.base, pokemon: saved }));
        await this.statRepo.save(stats);
      }
      return this.findOne(saved.id);
    }

    const created = this.pokemonRepo.create(payload as Pokemon);
    created.types = types;
    const saved = await this.pokemonRepo.save(created);
    if (payload.stats) {
      const stats = payload.stats.map(s => this.statRepo.create({ name: s.name, base: s.base, pokemon: saved }));
      await this.statRepo.save(stats);
    }
    return this.findOne(saved.id);
  }
}
