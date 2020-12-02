import { ConfigFactory } from '@nestjs/config/dist/interfaces';

export enum ConfigTypes {
  PORT = 'PORT',

  // TypeORM
  TYPEORM_SEED = 'TYPEORM_SEED',
  TYPEORM_DROP_SCHEMA = 'TYPEORM_DROP_SCHEMA',
  TYPEORM_SYNCHRONIZE = 'TYPEORM_SYNCHRONIZE',

  // Postgres
  POSTGRES_HOST = 'POSTGRES_HOST',
  POSTGRES_PORT = 'POSTGRES_PORT',
  POSTGRES_USER = 'POSTGRES_USER',
  POSTGRES_PASSWORD = 'POSTGRES_PASSWORD',
  POSTGRES_DB = 'POSTGRES_DB',

  // Hasura
  HASURA_METADATA_RELOAD = 'HASURA_METADATA_RELOAD',
  HASURA_GRAPHQL_ADMIN_SECRET = 'HASURA_GRAPHQL_ADMIN_SECRET',
  HASURA_GRAPHQL_URI = 'HASURA_GRAPHQL_URI',

  // Auth
  JWT_SECRET = 'JWT_SECRET',
  JWT_EXPIRY = 'JWT_EXPIRY',
}

export interface ApiConfig {
  [ConfigTypes.PORT]: number | undefined
  [ConfigTypes.TYPEORM_SEED]: boolean
  [ConfigTypes.TYPEORM_DROP_SCHEMA]: boolean
  [ConfigTypes.TYPEORM_SYNCHRONIZE]: boolean
  [ConfigTypes.POSTGRES_HOST]: string | undefined
  [ConfigTypes.POSTGRES_PORT]: number | undefined
  [ConfigTypes.POSTGRES_USER]: string | undefined
  [ConfigTypes.POSTGRES_PASSWORD]: string | undefined
  [ConfigTypes.POSTGRES_DB]: string | undefined
  [ConfigTypes.HASURA_GRAPHQL_ADMIN_SECRET]: string | undefined
  [ConfigTypes.HASURA_GRAPHQL_URI]: string | undefined
  [ConfigTypes.HASURA_METADATA_RELOAD]: boolean
  [ConfigTypes.JWT_SECRET]: string | undefined
  [ConfigTypes.JWT_EXPIRY]: number | undefined
}

export const config: ConfigFactory<ApiConfig> = () => ({
  [ConfigTypes.PORT]: Number(process.env.PORT),
  [ConfigTypes.TYPEORM_SEED]: Boolean(process.env.TYPEORM_SEED),
  [ConfigTypes.TYPEORM_DROP_SCHEMA]: Boolean(process.env.TYPEORM_DROP_SCHEMA),
  [ConfigTypes.TYPEORM_SYNCHRONIZE]: Boolean(process.env.TYPEORM_SYNCHRONIZE),
  [ConfigTypes.POSTGRES_HOST]: process.env.POSTGRES_HOST,
  [ConfigTypes.POSTGRES_PORT]: Number(process.env.POSTGRES_PORT),
  [ConfigTypes.POSTGRES_USER]: process.env.POSTGRES_USER,
  [ConfigTypes.POSTGRES_PASSWORD]: process.env.POSTGRES_PASSWORD,
  [ConfigTypes.POSTGRES_DB]: process.env.POSTGRES_DB,
  [ConfigTypes.HASURA_METADATA_RELOAD]: Boolean(process.env.HASURA_METADATA_RELOAD),
  [ConfigTypes.HASURA_GRAPHQL_ADMIN_SECRET]: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  [ConfigTypes.HASURA_GRAPHQL_URI]: process.env.HASURA_GRAPHQL_URI,
  [ConfigTypes.JWT_SECRET]: process.env.JWT_SECRET,
  [ConfigTypes.JWT_EXPIRY]: Number(process.env.JWT_EXPIRY)
})
