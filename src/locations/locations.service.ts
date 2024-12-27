import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { AreasService } from 'src/areas/areas.service';
import { LogsService } from 'src/logs/logs.service';
import { config } from 'src/config';

interface LocationQueueItem {
  userId: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
}

@Injectable()
export class LocationsService {
  private queue: LocationQueueItem[] = [];

  constructor(
    private areasService: AreasService,
    private logService: LogsService,
  ) {
    setInterval(() => this.processLocations(), config.INTERVAL_TIME);
  }

  create({ userId, latitude, longitude }: CreateLocationDto) {
    this.queue.push({ userId, latitude, longitude, timestamp: new Date() });
  }

  /**
   * Process locations in the queue
   */
  async processLocations() {
    if (this.queue.length < config.BATCH_SIZE) {
      return;
    }

    const locationsToProcess = this.queue.splice(0, config.BATCH_SIZE);
    const logsToCreate = [];
    for (const location of locationsToProcess) {
      const areas = await this.areasService.getAreasContainingPoint({
        latitude: location.latitude,
        longitude: location.longitude,
      });
      areas.forEach((area) => {
        logsToCreate.push({
          userid: location.userId,
          timestamp: location.timestamp,
          areaid: area.id,
        });
      });
    }
    await this.logService.createMany(logsToCreate);
  }
}
