import { ApiProperty } from '@nestjs/swagger';
import { Track } from '../entities/track.entity';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto implements Partial<Track> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @ApiProperty({ nullable: true, required: false })
  @IsOptional()
  @IsUUID()
  albumId: string | null;

  @ApiProperty({ nullable: true, required: false })
  @IsOptional()
  @IsUUID()
  artistId: string | null;
}
