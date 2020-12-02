import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolvers } from './roles.resolvers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from './roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolesEntity])],
  providers: [RolesService, RolesResolvers],
  exports: [TypeOrmModule]
})
export class RolesModule {}
