import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AxisModule } from './axis/axis.module';
import { VehicleExploitationModule } from './vehicle-exploitation/vehicle-exploitation.module';

import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error.filter';

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
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter, // global http Exception Error handler filter
    },
  ],
})
export class AppModule {}
