import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType } from '@nestjs/graphql';
import { IProject } from './IProject';
import { UsersEntity } from '../users/users.entity';

@Entity('projects')
@ObjectType({
  implements: [IProject],
})
export class ProjectsEntity {
  @PrimaryGeneratedColumn('uuid')
  declare id: string

  @Column({
    type: 'text'
  })
  declare name: string

  @ManyToOne((type) => UsersEntity, (user) => user.projects)
  declare user: UsersEntity
}
