import { Test, TestingModule } from '@nestjs/testing';
import { AxisService } from './axis.service';

describe('AxisService', () => {
  let service: AxisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AxisService],
    }).compile();

    service = module.get<AxisService>(AxisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
