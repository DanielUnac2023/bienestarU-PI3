import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaService } from './prisma/prisma.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AgendamientosModule } from './modules/agendamientos/agendamientos.module.js';

@Module({
  imports: [PrismaModule, AgendamientosModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
