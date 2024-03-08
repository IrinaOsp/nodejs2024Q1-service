import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album, IAlbum } from './entities/album.entity';
import { database } from 'src/db/database';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const album: IAlbum = new Album({
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId || null,
    });
    database.albums.push(album);
    return album;
  }

  findAll() {
    return database.albums;
  }

  findOne(id: string) {
    const album = database.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = database.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    album.name = updateAlbumDto.name ?? album.name;
    album.year = updateAlbumDto.year ?? album.year;
    album.artistId = updateAlbumDto.artistId ?? album.artistId;
    return album;
  }

  remove(id: string) {
    const album = database.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    database.albums = database.albums.filter((album) => album.id !== id);
    database.tracks = database.tracks.map((track) =>
      track.albumId === id ? { ...track, albumId: null } : track,
    );
  }
}
