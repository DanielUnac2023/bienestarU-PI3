import { CategoriaServicio, EstadoCita } from '@prisma/client';

export class AgendamientoEntity {
  id: string;
  estudianteId: string;
  profesionalId: string;
  categoria: CategoriaServicio;
  fechaHoraInicio: Date;
  fechaHoraFin: Date;
  lugar: string;
  motivo?: string;
  estado: EstadoCita;
  createdAt: Date;
  updatedAt: Date;
}