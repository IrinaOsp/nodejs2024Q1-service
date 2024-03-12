import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Album } from '../entities/album.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto implements Partial<Album> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({ nullable: true, required: false })
  @IsOptional()
  @IsUUID()
  artistId: string | null;
}
