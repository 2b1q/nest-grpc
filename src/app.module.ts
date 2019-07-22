import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AxisModule } from './axis/axis.module';
import { VehicleExploitationModule } from './vehicle-exploitation/vehicle-exploitation.module';

const URI = process.env.URI ? process.env.URI : 'mongodb://localhost/snapshots';

@Module({
  imports: [
    AxisModule,
    VehicleExploitationModule,
    MongooseModule.forRoot(URI, {
      useNewUrlParser: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
