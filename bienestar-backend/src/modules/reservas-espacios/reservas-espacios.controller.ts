import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReservasEspaciosService } from './reservas-espacios.service.js';
import { CreateReservasEspacioDto } from './dto/create-reservas-espacio.dto.js';
import { UpdateReservasEspacioDto } from './dto/update-reservas-espacio.dto.js';

@Controller('reservas-espacios')
export class ReservasEspaciosController {
  constructor(private readonly reservasEspaciosService: ReservasEspaciosService) {}

  // RF-01: Endpoint para consultar disponibilidad por bloques de 60 minutos
  @Get('disponibilidad')
  obtenerDisponibilidad(
    @Query('espacioId') espacioId: string,
    @Query('fecha') fecha: string, // Espera un formato YYYY-MM-DD (ej: 2026-10-25)
  ) {
    return this.reservasEspaciosService.obtenerDisponibilidad(espacioId, fecha);
  }
/*
  @Post()
  create(@Body() createReservasEspacioDto: CreateReservasEspacioDto) {
    return this.reservasEspaciosService.create(createReservasEspacioDto);
  }

  @Get()
  findAll() {
    return this.reservasEspaciosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservasEspaciosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservasEspacioDto: UpdateReservasEspacioDto) {
    return this.reservasEspaciosService.update(+id, updateReservasEspacioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservasEspaciosService.remove(+id);
  }*/
}