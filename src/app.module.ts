import { Module } from '@nestjs/common';
import { AxisModule } from './axis/axis.module';

@Module({
  imports: [AxisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
