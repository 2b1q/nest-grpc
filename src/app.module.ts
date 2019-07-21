import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AxisModule } from './axis/axis.module';
import { VehicleExploitationModule } from './vehicle-exploitation/vehicle-exploitation.module';

@Module({
  imports: [
    AxisModule,
    VehicleExploitationModule,
    MongooseModule.forRoot('mongodb://mongo/snapshots'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
