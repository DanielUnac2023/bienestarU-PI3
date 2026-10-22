import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateAgendamientoDto } from './dto/create-agendamiento.dto.js';
import { UpdateAgendamientoDto } from './dto/update-agendamiento.dto.js';

@Injectable()
export class AgendamientosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAgendamientoDto: CreateAgendamientoDto) {
    const { fechaHoraInicio, fechaHoraFin, profesionalId } = createAgendamientoDto;

    const inicio = new Date(fechaHoraInicio);
    const fin = new Date(fechaHoraFin);

    if (inicio >= fin) {
      throw new BadRequestException('La fecha de inicio debe ser anterior a la fecha de fin');
    }

    // Validación de negocio: Verificar que el profesional no tenga otra cita activa en ese rango de horario
    const conflicto = await this.prisma.agendamiento.findFirst({
      where: {
        profesionalId,
        estado: { notIn: ['CANCELADA'] },
        OR: [
          {
            fechaHoraInicio: { lte: inicio },
            fechaHoraFin: { gt: inicio },
          },
          {
            fechaHoraInicio: { lt: fin },
            fechaHoraFin: { gte: fin },
          },
        ],
      },
    });

    if (conflicto) {
      throw new BadRequestException('El profesional ya tiene una cita asignada en ese rango de horario');
    }

    return this.prisma.agendamiento.create({
      data: {
        ...createAgendamientoDto,
        fechaHoraInicio: inicio,
        fechaHoraFin: fin,
      },
    });
  }

  async findAll() {
    return this.prisma.agendamiento.findMany({
      orderBy: { fechaHoraInicio: 'desc' },
    });
  }

  async findOne(id: string) {
    const agendamiento = await this.prisma.agendamiento.findUnique({
      where: { id },
    });

    if (!agendamiento) {
      throw new NotFoundException(`No se encontró el agendamiento con ID ${id}`);
    }

    return agendamiento;
  }

  async findByEstudiante(estudianteId: string) {
    return this.prisma.agendamiento.findMany({
      where: { estudianteId },
      orderBy: { fechaHoraInicio: 'desc' },
    });
  }

  async update(id: string, updateAgendamientoDto: UpdateAgendamientoDto) {
    await this.findOne(id);

    const dataToUpdate: any = { ...updateAgendamientoDto };

    if (updateAgendamientoDto.fechaHoraInicio) {
      dataToUpdate.fechaHoraInicio = new Date(updateAgendamientoDto.fechaHoraInicio);
    }
    if (updateAgendamientoDto.fechaHoraFin) {
      dataToUpdate.fechaHoraFin = new Date(updateAgendamientoDto.fechaHoraFin);
    }

    return this.prisma.agendamiento.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.agendamiento.delete({
      where: { id },
    });
  }
}