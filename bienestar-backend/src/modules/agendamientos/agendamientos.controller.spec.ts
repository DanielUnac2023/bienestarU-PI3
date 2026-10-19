import { Test, TestingModule } from '@nestjs/testing';
import { AgendamientosController } from './agendamientos.controller.js';
import { AgendamientosService } from './agendamientos.service.js';

describe('AgendamientosController', () => {
  let controller: AgendamientosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgendamientosController],
      providers: [AgendamientosService],
    }).compile();

    controller = module.get<AgendamientosController>(AgendamientosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
