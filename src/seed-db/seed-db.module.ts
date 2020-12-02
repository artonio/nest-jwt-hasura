import { Module } from '@nestjs/common';
import { SeedDbService } from './seed-db.service';
import { UsersModule } from '../users/users.module';
import { ProjectsModule } from '../projects/projects.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    UsersModule,
    ProjectsModule,
    RolesModule
  ],
  providers: [SeedDbService],
  exports: [SeedDbService]
})
export class SeedDbModule {}
