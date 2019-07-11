import { Controller, OnModuleInit, Logger } from '@nestjs/common';
import { Client, ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { grpcClientOptions } from 'src/grpc.client';
import { Axis, AxisById } from './interfaces/hero.interface';

interface AxisService {
  findOne(req: { id: string }): Observable<any>;
}

@Controller('axis')
export class AxisController implements OnModuleInit {
  @Client(grpcClientOptions)
  private readonly client: ClientGrpc;

  private axisService: AxisService;

  onModuleInit() {
    this.axisService = this.client.getService<AxisService>('AxisService');
  }

  @GrpcMethod('AxisService')
  findOne(req: AxisById): Axis {
    Logger.log(req, 'call gRPC AxisService');
    // mock data
    const items: Axis[] = [
      { id: 'uuid-1', a1: 1200, a2: 1500 },
      { id: 'uuid-2', a1: 3000, a2: 4500 },
      { id: 'uuid-3', a1: 5000, a2: 5000, a3: 5000, a4: 6000, a5: 6000 },
      {
        id: 'uuid-4',
        a1: 5000,
        a2: 5000,
        a3: 5000,
        a4: 6000,
        a5: 6000,
        a6: 6000,
        a7: 6000,
      },
    ];
    return items.find(({ id }) => id === req.id);
  }
}
