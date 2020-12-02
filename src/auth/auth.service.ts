import { Injectable } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { UsersEntity } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtStrategy: JwtStrategy,
  ) {}

  async createAuthToken() {
    const user = {
      username: 'test',
      userId: 1,
    }

    return this.jwtStrategy.login(user)
  }

  async getToken(user: UsersEntity) {
    return this.jwtStrategy.getToken(user)
  }

}
