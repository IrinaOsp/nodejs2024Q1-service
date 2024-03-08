import { ApiProperty } from '@nestjs/swagger';
import { Track } from '../entities/track.entity';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackDto implements Partial<Track> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @ApiProperty()
  albumId: string | null;

  @ApiProperty()
  artistId: string | null;
}
