export interface IFavorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export class Favorite implements IFavorites {
  artists: string[] = [];
  albums: string[] = [];
  tracks: string[] = [];

  constructor(favorite: Partial<Favorite>) {
    Object.assign(this, favorite);
  }
}
