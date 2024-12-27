import { Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from 'src/shared/entities/area.entity';
import { Repository } from 'typeorm';
import { PointDto } from './dto/point.dto';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area)
    private areasRepository: Repository<Area>,
  ) {}

  async create({ name, points }: CreateAreaDto): Promise<Area> {
    const geoJsonPolygon = {
      type: 'Polygon',
      coordinates: [
        points
          .map((p) => [p.longitude, p.latitude])
          .concat([[points[0].longitude, points[0].latitude]]), // Ensure closure by repeating the first point.
      ],
    };

    const area = this.areasRepository.create({
      name,
      boundary: geoJsonPolygon, // Use POLYGON for closed shapes
    });
    return this.areasRepository.save(area);
  }

  findAll(): Promise<Area[]> {
    return this.areasRepository.find();
  }

  getAreasContainingPoint(point: PointDto): Promise<Area[]> {
    const pointGeom = `SRID=4326;POINT(${point.longitude} ${point.latitude})`;
    return this.areasRepository.query(
      `SELECT * FROM areas WHERE ST_Contains(boundary, ST_GeomFromEWKT('${pointGeom}'))`,
    );
  }
}
