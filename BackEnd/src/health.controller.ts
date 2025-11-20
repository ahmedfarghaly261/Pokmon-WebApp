import { Controller, Get } from '@nestjs/common';

@Controller('')
export class HealthController {
  @Get()
  root() {
    return { status: 'ok', message: 'Pokédex API is running' };
  }

  @Get('health')
  health() {
    return { status: 'ok', message: 'Pokédex API is running' };
  }
}
