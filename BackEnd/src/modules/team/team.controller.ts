import { Controller, Post, Body, Get, Param, ParseIntPipe, UseGuards, Delete } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { AddPokemonDto } from './dto/add-pokemon.dto';
import { AuthGuard } from '../../common/auth.guard';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() dto: CreateTeamDto) {
    return this.teamService.create(dto.name, dto.ownerToken);
  }

  @Get()
  async list() {
    return this.teamService.findAll();
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.teamService.findOne(id);
  }

  @Post(':id/pokemon')
  @UseGuards(AuthGuard)
  async addPokemon(@Param('id', ParseIntPipe) id: number, @Body() dto: AddPokemonDto) {
    return this.teamService.addPokemon(id, dto.pokemonId, dto.slot);
  }

  @Delete(':id/pokemon/:tpId')
  @UseGuards(AuthGuard)
  async removePokemon(@Param('id', ParseIntPipe) id: number, @Param('tpId', ParseIntPipe) tpId: number) {
    return this.teamService.removePokemon(id, tpId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.teamService.delete(id);
  }
}
