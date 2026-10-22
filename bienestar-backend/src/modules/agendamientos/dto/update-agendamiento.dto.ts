import { PartialType } from '@nestjs/mapped-types';
import { CreateAgendamientoDto } from './create-agendamiento.dto.js';
import { IsEnum, IsOptional } from 'class-validator';
import { EstadoCita } from '@prisma/client';

export class UpdateAgendamientoDto extends PartialType(CreateAgendamientoDto) {
  @IsOptional()
  @IsEnum(EstadoCita, { 
    message: 'El estado debe ser un valor válido de EstadoCita' 
  })
  estado?: EstadoCita;
}