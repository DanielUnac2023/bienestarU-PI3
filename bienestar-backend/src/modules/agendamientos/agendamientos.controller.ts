import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete 
} from '@nestjs/common';
import { AgendamientosService } from './agendamientos.service.js';
import { CreateAgendamientoDto } from './dto/create-agendamiento.dto.js';
import { UpdateAgendamientoDto } from './dto/update-agendamiento.dto.js';

@Controller('agendamientos')
export class AgendamientosController {
  constructor(private readonly agendamientosService: AgendamientosService) {}

  @Post()
  create(@Body() createAgendamientoDto: CreateAgendamientoDto) {
    return this.agendamientosService.create(createAgendamientoDto);
  }

  @Get()
  findAll() {
    return this.agendamientosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agendamientosService.findOne(id);
  }

  @Get('estudiante/:estudianteId')
  findByEstudiante(@Param('estudianteId') estudianteId: string) {
    return this.agendamientosService.findByEstudiante(estudianteId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateAgendamientoDto: UpdateAgendamientoDto,
  ) {
    return this.agendamientosService.update(id, updateAgendamientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agendamientosService.remove(id);
  }
}