import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @IsNotEmpty()
  @IsLongitude()
  longitude: number;
}
