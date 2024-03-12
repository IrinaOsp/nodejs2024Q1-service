import { ApiProperty } from '@nestjs/swagger';

export interface IArtist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export class Artist implements IArtist {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  grammy: boolean;

  constructor(artist: Partial<Artist>) {
    Object.assign(this, artist);
  }
}
