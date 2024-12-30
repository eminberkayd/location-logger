import {
  IsArray,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { PointDto } from './point.dto';
import { Type } from 'class-transformer';

export class CreateAreaDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PointDto)
  @Length(3, 50)
  points: PointDto[];
}
