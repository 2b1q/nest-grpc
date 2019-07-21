import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { grpcClientOptions, grpcVehicleOptions } from './grpc.client';

// TODO wrap into docker-composer
async function bootstrap() {
  /**
   * Hybrid App1 (HTTP:3000 + gRPC:5000)
   * App2 (gRPC:5001)
   */
  // init Hybrid App1
  const app1 = await NestFactory.create(AppModule);
  app1.connectMicroservice(grpcClientOptions);
  await app1.startAllMicroservicesAsync();
  await app1.listen(3000);
  // init gRPC App2
  const app2 = await NestFactory.create(AppModule);
  app2.connectMicroservice(grpcVehicleOptions);
  await app2.startAllMicroservices();
}
bootstrap();
