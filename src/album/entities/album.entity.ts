import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export interface IAlbum {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export class Album implements IAlbum {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  year: number;

  @ApiPropertyOptional()
  artistId: string | null;

  constructor(album: Partial<Album>) {
    Object.assign(this, album);
  }
}
