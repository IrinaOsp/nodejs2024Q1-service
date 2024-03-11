import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export interface ITrack {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export class Track implements ITrack {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  artistId: string | null;

  @ApiPropertyOptional()
  albumId: string | null;

  @ApiProperty()
  duration: number;

  constructor(track: Partial<Track>) {
    Object.assign(this, track);
  }
}
