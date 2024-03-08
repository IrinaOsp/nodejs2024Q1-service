import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @ApiProperty({ required: false })
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  grammy: boolean;
}
