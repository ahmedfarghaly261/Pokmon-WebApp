import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Team } from './team.entity';
import { Pokemon } from '../../pokemon/entities/pokemon.entity';

@Entity({ name: 'team_pokemon' })
export class TeamPokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, (t) => t.pokemons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @ManyToOne(() => Pokemon, { eager: true })
  @JoinColumn({ name: 'pokemon_id' })
  pokemon: Pokemon;

  @Column({ nullable: true })
  slot: number; // 1..6
}
