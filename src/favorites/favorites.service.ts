import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { database } from 'src/db/database';
import { IFavoritesResponse } from './interfaces/Ifavorites';

@Injectable()
export class FavoritesService {
  findAll(): IFavoritesResponse {
    const artists = database.artists.filter((artist) =>
      database.favorites.artists.includes(artist.id),
    );
    const albums = database.albums.filter((album) =>
      database.favorites.albums.includes(album.id),
    );
    const tracks = database.tracks.filter((track) =>
      database.favorites.tracks.includes(track.id),
    );
    return { artists, albums, tracks };
  }

  addTrackToFavorites(id: string) {
    const track = database.tracks.find((track) => track.id === id);
    if (!track) {
      throw new UnprocessableEntityException(`Track with id ${id} not found`);
    }
    if (database.favorites.tracks.includes(id)) {
      return `The track with id ${id} is already added to favorites`;
    }
    database.favorites.tracks.push(id);
    return `The track with id ${id} has been added to favorites`;
  }

  removeTrackFromFavorites(id: string) {
    if (!database.favorites.tracks.includes(id)) {
      throw new NotFoundException(
        `The track with id ${id} is not in favorites`,
      );
    }
    database.favorites.tracks = database.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
    return `The track with id ${id} has been removed from favorites`;
  }

  addAlbumToFavorites(id: string) {
    if (database.favorites.albums.includes(id)) {
      return `The album with id ${id} is already added to favorites`;
    }
    if (database.albums.find((album) => album.id === id)) {
      database.favorites.albums.push(id);
      return `The album with id ${id} has been added to favorites`;
    }
    throw new UnprocessableEntityException(`Album with id ${id} not found`);
  }

  removeAlbumFromFavorites(id: string) {
    if (!database.favorites.albums.includes(id)) {
      throw new NotFoundException(
        `The album with id ${id} is not in favorites`,
      );
    }
    database.favorites.albums = database.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
    return `The album with id ${id} has been removed from favorites`;
  }

  addArtistToFavorites(id: string) {
    const artist = database.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new UnprocessableEntityException(`Artist with id ${id} not found`);
    }
    if (database.favorites.artists.includes(id)) {
      return `The artist with id ${id} is already added to favorites`;
    }
    database.favorites.artists.push(id);
    return `The artist with id ${id} has been added to favorites`;
  }

  removeArtistFromFavorites(id: string) {
    if (!database.favorites.artists.includes(id)) {
      throw new NotFoundException(
        `The artist with id ${id} is not in favorites`,
      );
    }
    database.favorites.artists = database.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
    return `The artist with id ${id} has been removed from favorites`;
  }
}
