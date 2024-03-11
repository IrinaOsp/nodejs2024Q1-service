import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { IFavoritesResponse } from './interfaces/Ifavorites';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOkResponse({ description: 'Lists of favorites' })
  findAll(): IFavoritesResponse {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  @ApiUnprocessableEntityResponse({ description: 'Track not found' })
  addTrackToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiNotFoundResponse({ description: 'Track id not found' })
  removeTrackFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeTrackFromFavorites(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  @ApiUnprocessableEntityResponse({ description: 'Album not found' })
  addAlbumToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiNotFoundResponse({ description: 'Album id not found' })
  removeAlbumFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeAlbumFromFavorites(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  @ApiUnprocessableEntityResponse({ description: 'Artist not found' })
  addArtistToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiNotFoundResponse({ description: 'Track id not found' })
  removeArtistFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeArtistFromFavorites(id);
  }
}
