import { IAlbum } from 'src/album/entities/album.entity';
import { IArtist } from 'src/artist/entities/artist.entity';
import { ITrack } from 'src/track/entities/track.entity';
import { IUser } from 'src/user/entities/user.entity';

interface IDatabase {
  users: IUser[];
  artists: IArtist[];
  tracks: ITrack[];
  albums: IAlbum[];
  favorites: {
    artists: IArtist['id'][];
    albums: IAlbum['id'][];
    tracks: ITrack['id'][];
  };
}

export const database: IDatabase = {
  users: [],
  artists: [],
  tracks: [],
  albums: [],
  favorites: {
    artists: [],
    albums: [],
    tracks: [],
  },
};
