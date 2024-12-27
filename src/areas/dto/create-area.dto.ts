import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { PointDto } from './point.dto';
import { Type } from 'class-transformer';

export class CreateAreaDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PointDto)
  points: PointDto[];
}
