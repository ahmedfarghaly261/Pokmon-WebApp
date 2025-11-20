import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExternalImportService {
  private readonly logger = new Logger(ExternalImportService.name);

  async fetchPokemonByIdOrName(idOrName: string | number) {
    const url = `https://pokeapi.co/api/v2/pokemon/${idOrName}`;
    this.logger.log(`Fetching ${url}`);
    const res = await axios.get(url);
    return res.data;
  }

  mapPokeApiToInternal(data: any) {
    const mapped = {
      name: data.name,
      externalId: data.id,
      height: data.height,
      weight: data.weight,
      sprites: data.sprites,
      types: data.types.map(t => ({ name: t.type.name })),
      stats: data.stats.map(s => ({ name: s.stat.name, base: s.base_stat })),
    };
    return mapped;
  }
}
