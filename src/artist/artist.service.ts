import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist, IArtist } from './entities/artist.entity';
import { database } from 'src/db/database';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const artist: IArtist = new Artist({
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });
    database.artists.push(artist);
    return artist;
  }

  findAll() {
    return database.artists;
  }

  findOne(id: string) {
    const artist = database.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = database.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    artist.name = updateArtistDto.name ?? artist.name;
    artist.grammy = updateArtistDto.grammy ?? artist.grammy;
    return artist;
  }

  remove(id: string) {
    const artist = database.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    database.artists = database.artists.filter((artist) => artist.id !== id);
    database.tracks = database.tracks.map((track) =>
      track.artistId === id ? { ...track, artistId: null } : track,
    );
    database.albums = database.albums.map((album) =>
      album.artistId === id ? { ...album, artistId: null } : album,
    );
  }
}
