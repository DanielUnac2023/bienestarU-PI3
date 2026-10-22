import { PartialType } from '@nestjs/mapped-types';
import { CreateReservasEspacioDto } from './create-reservas-espacio.dto.js';

export class UpdateReservasEspacioDto extends PartialType(CreateReservasEspacioDto) {}
