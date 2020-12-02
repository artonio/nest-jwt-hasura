import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType } from '@nestjs/graphql';
import { IUser } from './IUser';
import { ProjectsEntity } from '../projects/projects.entity';
import * as bcrypt from 'bcrypt'
import { RolesEntity } from '../roles/roles.entity';

@Entity('users')
@ObjectType({
  implements: [IUser],
})
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  declare id: string

  @Column({
    type: 'text',
    unique: true,
  })
  declare username: string

  @Column({
    type: 'text',
    select: false,
    nullable: true,
  })
  declare password: string

  @OneToMany((type) => ProjectsEntity, (project) => project.user)
  declare projects: Array<ProjectsEntity>

  @OneToOne(type => RolesEntity, (role) => role.user)
  declare role: RolesEntity

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.password)
  }
}
