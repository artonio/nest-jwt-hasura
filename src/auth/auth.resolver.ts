import { Query, Resolver } from '@nestjs/graphql';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Resolver(() => AuthDto)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query((returns) => AuthDto)
  async createAccessToken() {
    const dto = new AuthDto()

    dto.accessToken = await this.authService.createAuthToken()

    return dto
  }
}
