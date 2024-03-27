import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist, IArtist } from './entities/artist.entity';
import { DbService } from '../db/db.service';

@Injectable()
export class ArtistService {
  constructor(private dbService: DbService) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist: IArtist = new Artist({
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });
    await this.dbService.artist.create({ data: artist });
    return artist;
  }

  async findAll() {
    return await this.dbService.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.dbService.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.dbService.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    artist.name = updateArtistDto.name ?? artist.name;
    artist.grammy = updateArtistDto.grammy ?? artist.grammy;
    await this.dbService.artist.update({ where: { id }, data: artist });
    return artist;
  }

  async remove(id: string) {
    const artist = await this.dbService.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    await this.dbService.artist.delete({ where: { id } });
  }
}
