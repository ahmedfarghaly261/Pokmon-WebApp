import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { PokemonType } from './pokemon-type.entity';
import { PokemonStat } from './pokemon-stat.entity';

@Entity({ name: 'pokemon' })
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  externalId: number;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  weight: number;

  @Column({ type: 'json', nullable: true })
  sprites: any;

  @ManyToMany(() => PokemonType, (type) => type.pokemon, { cascade: true })
  @JoinTable({ name: 'pokemon_types' })
  types: PokemonType[];

  @OneToMany(() => PokemonStat, (stat) => stat.pokemon, { cascade: true })
  stats: PokemonStat[];
}
