import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonListDto } from './dto/pokemon-list.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async list(@Query() q: PokemonListDto) {
    return this.pokemonService.findAll(q.q, q.page, q.limit);
  }

  @Get(':id')
  async details(@Param('id', ParseIntPipe) id: number) {
    return this.pokemonService.findOne(id);
  }
}
