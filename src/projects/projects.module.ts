import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './projects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsEntity])],
  providers: [
    ProjectsService,
    ProjectsResolver
  ],
  exports: [TypeOrmModule]
})
export class ProjectsModule {

}
