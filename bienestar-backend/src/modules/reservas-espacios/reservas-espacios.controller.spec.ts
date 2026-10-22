import { Test, TestingModule } from '@nestjs/testing';
import { ReservasEspaciosController } from './reservas-espacios.controller.js';
import { ReservasEspaciosService } from './reservas-espacios.service.js';

describe('ReservasEspaciosController', () => {
  let controller: ReservasEspaciosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservasEspaciosController],
      providers: [ReservasEspaciosService],
    }).compile();

    controller = module.get<ReservasEspaciosController>(ReservasEspaciosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
