import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEntity } from './roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(RolesEntity)
  private readonly rolesRepository: Repository<RolesEntity>) {
  }

  async findAll(): Promise<RolesEntity[]> {
    return this.rolesRepository.find()
  }
}
