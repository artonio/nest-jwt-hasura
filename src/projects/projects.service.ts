import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsEntity } from './projects.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(ProjectsEntity)
              private readonly projectsRepository: Repository<ProjectsEntity>) {
  }

  async findAll(): Promise<Array<ProjectsEntity>> {
    return this.projectsRepository.find()
  }
}
