import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { database } from 'src/db/database';
import { ITrack, Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const track: ITrack = new Track({
      id: uuidv4(),
      name: createTrackDto.name,
      duration: createTrackDto.duration,
      albumId: createTrackDto.albumId || null,
      artistId: createTrackDto.artistId || null,
    });
    database.tracks.push(track);
    return track;
  }

  findAll() {
    return database.tracks;
  }

  findOne(id: string) {
    const track = database.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = database.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    track.name = updateTrackDto.name ?? track.name;
    track.duration = updateTrackDto.duration ?? track.duration;
    track.albumId = updateTrackDto.albumId ?? track.albumId;
    track.artistId = updateTrackDto.artistId ?? track.artistId;
    return track;
  }

  remove(id: string) {
    const track = database.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    database.tracks = database.tracks.filter((track) => track.id !== id);
    return `Track ${id} deleted`;
  }
}
