import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ApiConfig, ConfigTypes } from './apiConfig';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigJwtService implements JwtOptionsFactory {
  constructor(private readonly config: ConfigService<ApiConfig>) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.config.get(ConfigTypes.JWT_SECRET),
      signOptions: {
        algorithm: 'HS512',
        expiresIn: this.config.get(ConfigTypes.JWT_EXPIRY),
      },
    } as JwtModuleOptions
  }
}
