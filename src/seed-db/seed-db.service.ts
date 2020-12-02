import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../users/users.entity';
import { Repository } from 'typeorm';
import { ProjectsEntity } from '../projects/projects.entity';
import { RolesEntity } from '../roles/roles.entity';
import { Role } from '../roles/IRole';

@Injectable()
export class SeedDbService {
  constructor(@InjectRepository(UsersEntity)
              private readonly usersRepository: Repository<UsersEntity>,
              @InjectRepository(ProjectsEntity)
              private readonly projectsRepository: Repository<ProjectsEntity>,
              @InjectRepository(RolesEntity)
              private readonly rolesRepository: Repository<RolesEntity>) {
  }

  async seedDB() {

    await this.projectsRepository.query(`DELETE FROM projects; COMMIT;`)
    await this.usersRepository.query(`DELETE FROM users; COMMIT;`)
    await this.rolesRepository.query(`DELETE FROM roles; COMMIT;`)

    const adminRole = new RolesEntity()
    adminRole.role = Role.ADMIN

    const observerRole = new RolesEntity()
    observerRole.role = Role.OBSERVER

    await this.rolesRepository.save([adminRole, observerRole])

    const user = new UsersEntity()
    user.username = 'admin'
    user.password = 'password'
    user.role = adminRole

    const user1 = new UsersEntity()
    user1.username = 'john'
    user1.password = 'password'
    user1.role = observerRole

    const project1 = new ProjectsEntity()
    project1.name = 'Project 1'

    const project2 = new ProjectsEntity()
    project2.name = 'Project 2'

    await this.projectsRepository.save([project1, project2])
    user.projects = [project1, project2]

    await this.usersRepository.save([user, user1])
  }
}
