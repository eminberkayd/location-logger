import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from '../shared/entities/log.entity';
import { CreateLogDto } from './dto/create-log.dto';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log)
    private readonly logsRepository: Repository<Log>,
  ) {}

  findAll() {
    return this.logsRepository.find();
  }

  async createMany(logs: CreateLogDto[]): Promise<Log[]> {
    return this.logsRepository.save(logs);
  }
}
