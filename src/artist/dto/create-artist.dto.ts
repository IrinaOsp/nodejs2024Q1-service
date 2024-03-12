import { ApiProperty } from '@nestjs/swagger';
import { Artist } from '../entities/artist.entity';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto implements Partial<Artist> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
