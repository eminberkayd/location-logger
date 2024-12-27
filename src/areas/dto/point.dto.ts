import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

export class PointDto {
  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @IsNotEmpty()
  @IsLongitude()
  longitude: number;
}
