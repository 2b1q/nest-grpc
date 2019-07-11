import { Module } from '@nestjs/common';
import { AxisService } from './axis.service';
import { AxisController } from './axis.controller';

@Module({
  providers: [AxisService],
  controllers: [AxisController]
})
export class AxisModule {}
