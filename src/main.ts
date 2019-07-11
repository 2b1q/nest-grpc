import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { grpcClientOptions } from './grpc.client';

async function bootstrap() {
  /**
   * Hybrid application (HTTP + GRPC)
   */
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(grpcClientOptions);
  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
