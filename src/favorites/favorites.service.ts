import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
// import { IFavoritesResponse } from './interfaces/Ifavorites';
import { DbService } from 'src/db/db.service';

@Injectable()
export class FavoritesService {
  constructor(private dbService: DbService) {}

  async findAll() {
    try {
      const artists = await this.dbService.artist
        .findMany({
          where: { favorites: true },
        })
        .then((res) => {
          return res.map((artist) => {
            const { favorites, ...rest } = artist;
            return rest;
          });
        });
      const albums = await this.dbService.album
        .findMany({
          where: { favorites: true },
        })
        .then((res) => {
          return res.map((album) => {
            const { favorites, ...rest } = album;
            return rest;
          });
        });
      const tracks = await this.dbService.track
        .findMany({
          where: { favorites: true },
        })
        .then((res) => {
          return res.map((track) => {
            const { favorites, ...rest } = track;
            return rest;
          });
        });
      return { artists, albums, tracks };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async addTrackToFavorites(id: string) {
    const track = await this.dbService.track.findUnique({ where: { id } });
    if (!track) {
      throw new UnprocessableEntityException(`Track with id ${id} not found`);
    }
    if (track.favorites) {
      return `The track with id ${id} is already added to favorites`;
    }
    await this.dbService.track.update({
      where: { id },
      data: { favorites: true },
    });
    return `The track with id ${id} has been added to favorites`;
  }

  async removeTrackFromFavorites(id: string) {
    const track = await this.dbService.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    if (!track.favorites) {
      return `The track with id ${id} is not added to favorites`;
    }
    await this.dbService.track.update({
      where: { id },
      data: { favorites: false },
    });
    return `The track with id ${id} has been removed from favorites`;
  }

  async addAlbumToFavorites(id: string) {
    const album = await this.dbService.album.findUnique({ where: { id } });
    if (!album) {
      throw new UnprocessableEntityException(`Album with id ${id} not found`);
    }
    if (album.favorites) {
      return `The album with id ${id} is already added to favorites`;
    }
    await this.dbService.album.update({
      where: { id },
      data: { favorites: true },
    });
    return `The album with id ${id} has been added to favorites`;
  }

  async removeAlbumFromFavorites(id: string) {
    const album = await this.dbService.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    if (!album.favorites) {
      return `The album with id ${id} is not added to favorites`;
    }
    await this.dbService.album.update({
      where: { id },
      data: { favorites: false },
    });
    return `The album with id ${id} has been removed from favorites`;
  }

  async addArtistToFavorites(id: string) {
    const artist = await this.dbService.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new UnprocessableEntityException(`Artist with id ${id} not found`);
    }
    if (artist.favorites) {
      return `The artist with id ${id} is already added to favorites`;
    }
    await this.dbService.artist.update({
      where: { id },
      data: { favorites: true },
    });
    return `The artist with id ${id} has been added to favorites`;
  }

  async removeArtistFromFavorites(id: string) {
    const artist = await this.dbService.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    if (!artist.favorites) {
      return `The artist with id ${id} is not added to favorites`;
    }
    await this.dbService.artist.update({
      where: { id },
      data: { favorites: false },
    });
    return `The artist with id ${id} has been removed from favorites`;
  }
}
