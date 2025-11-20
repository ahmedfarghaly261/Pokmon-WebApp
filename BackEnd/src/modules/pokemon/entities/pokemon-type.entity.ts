import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Entity({ name: 'pokemon_type' })
export class PokemonType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Pokemon, (pokemon) => pokemon.types)
  pokemon: Pokemon[];
}
