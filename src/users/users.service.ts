import { HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { UserInput } from './UserInput';
import { UserDto } from './dto/UserDto';
import { AppApolloError, AppErrorEnum } from '../filters/AppApolloError';
import { AuthService } from '../auth/auth.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class UsersService implements OnModuleInit  {
  declare authService: AuthService
  constructor(@InjectRepository(UsersEntity)
              private readonly usersRepository: Repository<UsersEntity>,
              private moduleRef: ModuleRef) {
  }

  async findAll(): Promise<Array<UsersEntity>> {
    return this.usersRepository.find()
  }

  async login(user: UserInput): Promise<UserDto> {
    const foundUser = await this.usersRepository.findOneOrFail({
      select: ['id', 'username', 'password'],
      relations: ['role'],
      where: { username: user.username },
    })

    const passwordMatch = await foundUser?.comparePassword(user.password)
    if (!passwordMatch) {
      throw new AppApolloError(
        `Wrong password for user: ${user.username}`,
        AppErrorEnum.WRONG_CREDENTIALS,
        HttpStatus.UNAUTHORIZED.toString(),
      )
    } else {
      const res = new UserDto()

      res.user = foundUser
      res.accessToken = await this.authService.getToken(foundUser)

      return res
    }
  }

  onModuleInit(): any {
    this.authService = this.moduleRef.get(AuthService, {strict: false})
  }
}
