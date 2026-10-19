import { Module } from '@nestjs/common';
import { AgendamientosService } from './agendamientos.service.js';
import { AgendamientosController } from './agendamientos.controller.js';

@Module({
  controllers: [AgendamientosController],
  providers: [AgendamientosService],
})
export class AgendamientosModule {}
