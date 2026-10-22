import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class ReservasEspaciosService {
  constructor(private readonly prisma: PrismaService) {}

  async obtenerDisponibilidad(espacioId: string, fechaStr: string) {
    // 1. Verificar si existe el espacio deportivo
    const espacio = await this.prisma.espacioDeportivo.findUnique({
      where: { id: espacioId },
    });

    if (!espacio) {
      throw new NotFoundException('El espacio deportivo no existe.');
    }

    // 2. Definir rango del día (00:00:00 a 23:59:59)
    const inicioDia = new Date(`${fechaStr}T00:00:00.000Z`);
    const finDia = new Date(`${fechaStr}T23:59:59.999Z`);

    // 3. Buscar reservas existentes activas en esa fecha
    const reservasOcupadas = await this.prisma.reserva.findMany({
      where: {
        espacioId,
        estado: { not: 'CANCELADA' },
        fechaInicio: { gte: inicioDia },
        fechaFin: { lte: finDia },
      },
    });

    // 4. Generar bloques operativos de 60 min (8 AM a 6 PM / 18:00)
    const bloquesDisponibilidad = [];
    const horaApertura = 8;
    const horaCierre = 18;

    for (let hora = horaApertura; hora < horaCierre; hora++) {
      const inicioBloque = new Date(
        `${fechaStr}T${hora.toString().padStart(2, '0')}:00:00.000Z`,
      );

      // Verificar si hay alguna reserva que se cruce con este bloque
      const estaOcupado = reservasOcupadas.some(
        (r: any) => r.fechaInicio.getTime() === inicioBloque.getTime(),
      );

      bloquesDisponibilidad.push({
        horaInicio: `${hora.toString().padStart(2, '0')}:00`,
        horaFin: `${(hora + 1).toString().padStart(2, '0')}:00`,
        estado: estaOcupado ? 'OCUPADO' : 'DISPONIBLE',
      });
    }

    return {
      espacio: espacio.nombre,
      minParticipantes: espacio.minParticipantes,
      fecha: fechaStr,
      bloques: bloquesDisponibilidad,
    };
  }
}