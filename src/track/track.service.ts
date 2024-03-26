import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrack, Track } from './entities/track.entity';
import { DbService } from 'src/db/db.service';

@Injectable()
export class TrackService {
  constructor(private dbService: DbService) {}

  async create(createTrackDto: CreateTrackDto) {
    const track: ITrack = new Track({
      id: uuidv4(),
      name: createTrackDto.name,
      duration: createTrackDto.duration,
      albumId: createTrackDto.albumId ?? null,
      artistId: createTrackDto.artistId ?? null,
    });
    return await this.dbService.track.create({ data: track });
  }

  async findAll() {
    return await this.dbService.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.dbService.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.dbService.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    track.name = updateTrackDto.name ?? track.name;
    track.duration = updateTrackDto.duration ?? track.duration;
    track.albumId = updateTrackDto.albumId ?? track.albumId;
    track.artistId = updateTrackDto.artistId ?? track.artistId;
    return await this.dbService.track.update({ where: { id }, data: track });
  }

  async remove(id: string) {
    const track = await this.dbService.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    await this.dbService.track.delete({ where: { id } });
    // database.favorites.tracks = database.favorites.tracks.filter(
    //   (trackId) => trackId !== id,
    // );
    return `Track ${id} deleted`;
  }
}
