import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Album } from './entities/album.entity';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Album successfully created',
    type: Album,
  })
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOkResponse({ description: 'List of albums', type: [Album] })
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Album found', type: Album })
  @ApiNotFoundResponse({ description: 'Album not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.albumService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Album successfully updated', type: Album })
  @ApiNotFoundResponse({ description: 'Album not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return await this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Album successfully deleted' })
  @ApiNotFoundResponse({ description: 'Album not found' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.albumService.remove(id);
  }
}
