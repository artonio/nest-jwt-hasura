import { Field, InterfaceType } from '@nestjs/graphql';
import { UsersEntity } from '../users/users.entity';

@InterfaceType()
export abstract class IProject {
  @Field()
  declare id: string

  @Field()
  declare name: string

  @Field((returns) => UsersEntity)
  declare user: UsersEntity
}
