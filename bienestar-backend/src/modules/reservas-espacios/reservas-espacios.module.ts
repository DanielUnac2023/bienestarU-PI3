import { Module } from '@nestjs/common';
import { ReservasEspaciosService } from './reservas-espacios.service.js';
import { ReservasEspaciosController } from './reservas-espacios.controller.js';

@Module({
  controllers: [ReservasEspaciosController],
  providers: [ReservasEspaciosService],
})
export class ReservasEspaciosModule {}
