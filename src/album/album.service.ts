import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album, IAlbum } from './entities/album.entity';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AlbumService {
  constructor(private dbService: DbService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album: IAlbum = new Album({
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId ?? null,
    });
    return await this.dbService.album.create({ data: album });
  }

  async findAll() {
    return await this.dbService.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.dbService.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.dbService.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    album.name = updateAlbumDto.name ?? album.name;
    album.year = updateAlbumDto.year ?? album.year;
    album.artistId = updateAlbumDto.artistId ?? album.artistId;
    await this.dbService.album.update({ where: { id }, data: album });
    return album;
  }

  async remove(id: string) {
    const album = await this.dbService.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    await this.dbService.album.delete({ where: { id } });
    // database.tracks = database.tracks.map((track) =>
    //   track.albumId === id ? { ...track, albumId: null } : track,
    // );
    // database.favorites.albums = database.favorites.albums.filter(
    //   (albumId) => albumId !== id,
    // );
  }
}
