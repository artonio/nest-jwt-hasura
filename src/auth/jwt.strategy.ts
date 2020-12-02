import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ApiConfig, ConfigTypes } from '../config/apiConfig';
import { ModuleRef } from '@nestjs/core';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UsersEntity } from '../users/users.entity';
import { Role } from '../roles/IRole';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') implements OnModuleInit  {
  private declare userService: UsersService

  constructor(
    private jwtService: JwtService,
    private readonly config: ConfigService<ApiConfig>,
    private moduleRef: ModuleRef,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get(ConfigTypes.JWT_SECRET),
      passReqToCallback: true,
    })
  }

  async validate(payload: any): Promise<UsersEntity> {
    const token = payload.headers.authorization
    return Promise.reject()
  }

  async getToken(user: UsersEntity) {
    const r = Role[user.role.role]
    const payload = {
      username: user.username,
      sub: user.id.toString(),
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['ADMIN'.toLowerCase(), 'OBSERVER'.toLowerCase()],
        'x-hasura-default-role': r.toLowerCase(),
        'x-hasura-role': r.toLowerCase(),
        'x-hasura-user-id': user.id.toString(),
      },
    }

    return this.jwtService.sign(payload)
  }

  async login(user: { username: string; userId: number }) {
    const payload = {
      username: user.username,
      sub: user.userId.toString(),
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['admin'],
        'x-hasura-default-role': 'admin',
        'x-hasura-user-id': user.userId.toString(),
      },
    }

    return this.jwtService.sign(payload)
  }

  onModuleInit(): any {
    this.userService = this.moduleRef.get(UsersService, { strict: false })
  }
}
