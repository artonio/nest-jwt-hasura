import { Field, InterfaceType } from '@nestjs/graphql';
import { ProjectsEntity } from '../projects/projects.entity';
import { RolesEntity } from '../roles/roles.entity';

@InterfaceType()
export abstract class IUser {
  @Field()
  declare id: string

  @Field({ nullable: false })
  declare username: string

  @Field((returns) => [ProjectsEntity])
  declare projects: Array<ProjectsEntity>

  @Field(() => RolesEntity)
  declare role: RolesEntity
}
