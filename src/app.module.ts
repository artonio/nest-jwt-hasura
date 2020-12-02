import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ConfigTypeormService } from './config/config-typeorm.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigGraphqlHasuraService } from './config/config-graphql-hasura.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { SeedDbService } from './seed-db/seed-db.service';
import { ApiConfig, ConfigTypes } from './config/apiConfig';
import { SeedDbModule } from './seed-db/seed-db.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import * as shell from 'shelljs'


@Module({
  imports: [
    AppConfigModule,
    UsersModule,
    ProjectsModule,
    SeedDbModule,
    AuthModule,
    RolesModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [ConfigService],
      useClass: ConfigTypeormService
    }),
    GraphQLModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [ConfigService],
      useClass: ConfigGraphqlHasuraService
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  implements OnModuleInit {
  constructor(
    private readonly seedDbService: SeedDbService,
    private readonly config: ConfigService<ApiConfig>,
  ) {}
  async onModuleInit() {

    if(this.config.get(ConfigTypes.HASURA_METADATA_RELOAD)) {
      shell.cd('hasura')
      shell.exec('hasura metadata apply')
    }

    if (this.config.get(ConfigTypes.TYPEORM_SEED)) {
      await this.seedDbService.seedDB()
    }
  }
}
