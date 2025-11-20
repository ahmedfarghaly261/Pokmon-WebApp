import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { TeamPokemon } from './team-pokemon.entity';

@Entity({ name: 'team' })
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  ownerToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => TeamPokemon, (tp) => tp.team, { cascade: true })
  pokemons: TeamPokemon[];
}
