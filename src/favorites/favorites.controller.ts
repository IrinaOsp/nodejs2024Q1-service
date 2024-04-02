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

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOkResponse({ description: 'Lists of favorites' })
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  @ApiOkResponse({ description: 'Track added to favorites' })
  @ApiUnprocessableEntityResponse({ description: 'Track not found' })
  async addTrackToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiOkResponse({ description: 'Track removed from favorites' })
  @ApiNotFoundResponse({ description: 'Track id not found' })
  async removeTrackFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.removeTrackFromFavorites(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  @ApiOkResponse({ description: 'Album added to favorites' })
  @ApiUnprocessableEntityResponse({ description: 'Album not found' })
  async addAlbumToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiOkResponse({ description: 'Album removed from favorites' })
  @ApiNotFoundResponse({ description: 'Album id not found' })
  async removeAlbumFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.removeAlbumFromFavorites(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  @ApiOkResponse({ description: 'Artist added to favorites' })
  @ApiUnprocessableEntityResponse({ description: 'Artist not found' })
  async addArtistToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiOkResponse({ description: 'Artist removed from favorites' })
  @ApiNotFoundResponse({ description: 'Track id not found' })
  async removeArtistFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.removeArtistFromFavorites(id);
  }
}
