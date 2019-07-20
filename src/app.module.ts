import { Module } from '@nestjs/common';
import { AxisModule } from './axis/axis.module';
import { VehicleExploitationModule } from './vehicle-exploitation/vehicle-exploitation.module';

@Module({
  imports: [AxisModule, VehicleExploitationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
