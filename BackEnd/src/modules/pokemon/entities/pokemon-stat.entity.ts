import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Entity({ name: 'pokemon_stat' })
export class PokemonStat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('int')
  base: number;

  @ManyToOne(() => Pokemon, (p) => p.stats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pokemon_id' })
  pokemon: Pokemon;
}
