import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiConfig, config, ConfigTypes } from './apiConfig';
import * as Joi from '@hapi/joi';
import { ConfigTypeormService } from './config-typeorm.service';
import { ConfigGraphqlHasuraService } from './config-graphql-hasura.service';
import { ConfigJwtService } from './config-jwt.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
      load: [config],
      validationSchema: Joi.object<ApiConfig>({
        [ConfigTypes.PORT]: Joi.number().required().default(3000),
        // Typeorm
        [ConfigTypes.TYPEORM_SEED]: Joi.boolean(),
        [ConfigTypes.TYPEORM_DROP_SCHEMA]: Joi.boolean(),
        [ConfigTypes.TYPEORM_SYNCHRONIZE]: Joi.boolean(),
        // Postgres DB
        [ConfigTypes.POSTGRES_HOST]: Joi.string().required(),
        [ConfigTypes.POSTGRES_PORT]: Joi.number().required(),
        [ConfigTypes.POSTGRES_USER]: Joi.string().required(),
        [ConfigTypes.POSTGRES_PASSWORD]: Joi.string().required(),
        [ConfigTypes.POSTGRES_DB]: Joi.string().required(),
        // Hasura
        [ConfigTypes.HASURA_GRAPHQL_ADMIN_SECRET]: Joi.string().required(),
        [ConfigTypes.HASURA_GRAPHQL_URI]: Joi.string().required(),
        // JWT
        [ConfigTypes.JWT_EXPIRY]: Joi.number().required(),
        [ConfigTypes.JWT_SECRET]: Joi.string().required(),
      })
    })
  ],
  providers: [ConfigTypeormService, ConfigGraphqlHasuraService, ConfigJwtService],
  exports: [ConfigTypeormService, ConfigGraphqlHasuraService, ConfigJwtService]
})
export class AppConfigModule {}
