import { IsInt, Min, Max } from 'class-validator';

export class AddPokemonDto {
  @IsInt()
  pokemonId: number;

  @IsInt()
  @Min(1)
  @Max(6)
  slot: number;
}
