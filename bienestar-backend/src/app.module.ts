import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaService } from './prisma/prisma.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ReservasEspaciosModule } from './modules/reservas-espacios/reservas-espacios.module.js';

@Module({
  imports: [PrismaModule, ReservasEspaciosModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
