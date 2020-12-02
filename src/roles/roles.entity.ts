import { ObjectType } from '@nestjs/graphql';
import { IRole, Role } from './IRole';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '../users/users.entity';

@ObjectType({
  implements: [IRole]
})
@Entity('roles')
export class RolesEntity {

  @PrimaryGeneratedColumn('uuid')
  declare id: string

  @Column({
    type: 'enum',
    enum: Role
  })
  declare role: Role

  @OneToOne(type => UsersEntity, user => user.role)
  @JoinColumn()
  declare user: UsersEntity

}
