import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { AreasModule } from 'src/areas/areas.module';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [AreasModule, LogsModule],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
