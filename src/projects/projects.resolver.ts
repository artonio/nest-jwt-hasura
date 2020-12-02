import { Query, Resolver } from '@nestjs/graphql';
import { ProjectsEntity } from './projects.entity';
import { UsersEntity } from '../users/users.entity';
import { ProjectsService } from './projects.service';

@Resolver(() => ProjectsEntity)
export class ProjectsResolver {
  constructor(public projectsService: ProjectsService) {}

  @Query(() => [UsersEntity])
  async getAllUsers() {
    return this.projectsService.findAll()
  }
}
