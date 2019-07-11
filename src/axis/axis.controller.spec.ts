import { Test, TestingModule } from '@nestjs/testing';
import { AxisController } from './axis.controller';

describe('Axis Controller', () => {
  let controller: AxisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AxisController],
    }).compile();

    controller = module.get<AxisController>(AxisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
