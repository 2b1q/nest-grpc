import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:5000',
    package: 'axis',
    protoPath: join(__dirname, './axis/axis.proto'),
  },
};
