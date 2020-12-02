import { Field, InterfaceType, registerEnumType } from '@nestjs/graphql';
import { UsersEntity } from '../users/users.entity';

export enum Role {
  ADMIN = 'ADMIN',
  OBSERVER = 'OBSERVER'
}

registerEnumType(Role, {name: 'Role'})

@InterfaceType()
export abstract class IRole {
  @Field()
  declare id: string

  @Field(returns => Role)
  declare role: Role

  @Field(returns => UsersEntity)
  declare user: UsersEntity
}
