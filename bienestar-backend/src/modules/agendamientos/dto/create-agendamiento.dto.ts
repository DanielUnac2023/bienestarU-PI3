import { 
  IsNotEmpty, 
  IsString, 
  IsEnum, 
  IsDateString, 
  IsOptional 
} from 'class-validator';
import { CategoriaServicio } from '@prisma/client';

export class CreateAgendamientoDto {
  @IsNotEmpty({ message: 'El ID del estudiante es obligatorio' })
  @IsString({ message: 'El ID del estudiante debe ser un texto' })
  estudianteId: string;

  @IsNotEmpty({ message: 'El ID del profesional es obligatorio' })
  @IsString({ message: 'El ID del profesional debe ser un texto' })
  profesionalId: string;

  @IsNotEmpty({ message: 'La categoría del servicio es obligatoria' })
  @IsEnum(CategoriaServicio, { 
    message: 'La categoría debe ser un valor válido (ej. PSICOLOGIA, NUTRICION, ESPIRITUAL)' 
  })
  categoria: CategoriaServicio;

  @IsNotEmpty({ message: 'La fecha y hora de inicio es obligatoria' })
  @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha ISO8601 válida' })
  fechaHoraInicio: string;

  @IsNotEmpty({ message: 'La fecha y hora de fin es obligatoria' })
  @IsDateString({}, { message: 'La fecha de fin debe ser una fecha ISO8601 válida' })
  fechaHoraFin: string;

  @IsNotEmpty({ message: 'El lugar de la cita es obligatorio' })
  @IsString({ message: 'El lugar debe ser una cadena de texto' })
  lugar: string;

  @IsOptional()
  @IsString({ message: 'El motivo debe ser una cadena de texto' })
  motivo?: string;
}