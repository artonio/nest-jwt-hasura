import { Args, Query, Resolver } from '@nestjs/graphql';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';
import { UserDto } from './dto/UserDto';
import { UserInput } from './UserInput';

@Resolver(() => UsersEntity)
export class UsersResolvers {

  constructor(public userService: UsersService) {}

  @Query(() => [UsersEntity])
  async getAllUsers() {
    return this.userService.findAll()
  }

  @Query((returns) => UserDto)
  async login(@Args('user') user: UserInput) {
    return this.userService.login(user)
  }
}
