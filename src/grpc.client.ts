import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:5000',
    package: 'axis',
    protoPath: join(__dirname, './axis/axis.proto'),
  },
};

export const grpcVehicleOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:5001',
    package: 'vehicle',
    protoPath: join(
      __dirname,
      './vehicle-exploitation/vehicle.exploitation.proto',
    ),
  },
};
