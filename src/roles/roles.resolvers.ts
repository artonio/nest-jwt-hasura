import { Query, Resolver } from '@nestjs/graphql';
import { RolesEntity } from './roles.entity';
import { RolesService } from './roles.service';

@Resolver(of => RolesEntity)
export class RolesResolvers {
  constructor(private readonly rolesService: RolesService) {
  }

  @Query(returns => [RolesEntity])
  async findAllRoles() {
    return this.rolesService.findAll()
  }

}
