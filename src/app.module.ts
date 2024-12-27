import { Module, ValidationPipe } from '@nestjs/common';
import { AreasModule } from './areas/areas.module';
import { LogsModule } from './logs/logs.module';
import { LocationsModule } from './locations/locations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from './shared/entities/area.entity';
import { Log } from './shared/entities/log.entity';
import { config } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.DB.HOST,
      port: config.DB.PORT,
      username: config.DB.USERNAME,
      password: config.DB.PASSWORD,
      database: config.DB.DATABASE,
      entities: [Area, Log],
      synchronize: false,
    }),
    AreasModule,
    LogsModule,
    LocationsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_PIPE',
      useClass: ValidationPipe,
      useFactory: () =>
        new ValidationPipe({
          whitelist: true, // Remove any properties not defined in the DTO
          forbidNonWhitelisted: true, // Throw an exception for extra properties
          transform: true, // Automatically transform data to the DTO type
        }),
    },
  ],
})
export class AppModule {}
