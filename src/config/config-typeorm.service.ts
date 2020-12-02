import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ApiConfig, ConfigTypes } from './apiConfig';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'


@Injectable()
export class ConfigTypeormService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService<ApiConfig>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      host: this.config.get(ConfigTypes.POSTGRES_HOST),
      type: 'postgres',
      port: this.config.get(ConfigTypes.POSTGRES_PORT),
      username: this.config.get(ConfigTypes.POSTGRES_USER),
      password: this.config.get(ConfigTypes.POSTGRES_PASSWORD),
      database: this.config.get(ConfigTypes.POSTGRES_DB),
      autoLoadEntities: true,
      // synchronize and dropSchema resets the database
      synchronize: this.config.get(ConfigTypes.TYPEORM_SYNCHRONIZE),
      dropSchema: this.config.get(ConfigTypes.TYPEORM_DROP_SCHEMA),
      logging: ['query', 'error', 'schema'],
      extra: {
        connectionLimit: 5,
      },
      namingStrategy: new SnakeNamingStrategy(),
    }
  }
}
