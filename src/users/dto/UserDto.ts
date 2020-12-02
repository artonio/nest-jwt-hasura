import { Field, ObjectType } from '@nestjs/graphql'
import { UsersEntity } from '../users.entity';

@ObjectType()
export class UserDto {
  @Field((returns) => UsersEntity)
  declare user: UsersEntity

  @Field()
  declare accessToken: string
}
