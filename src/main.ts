import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { grpcClientOptions, grpcVehicleOptions } from './grpc.client';

async function bootstrap() {
  /**
   * Hybrid App1 (HTTP + GRPC)
   * App2 (GRPC)
   */
  // init Hybrid App1
  const app1 = await NestFactory.create(AppModule);
  app1.connectMicroservice(grpcClientOptions);
  await app1.startAllMicroservicesAsync();
  await app1.listen(3000);
  // init gGRPC App2
  const app2 = await NestFactory.create(AppModule);
  app2.connectMicroservice(grpcVehicleOptions);
  await app2.startAllMicroservices();
}
bootstrap();
