import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ListSchema } from './list.schema';
import { UserSchema } from './user.schema';
import { BadgeSchema } from './badge.schema';


@Entity()
export class BoardSchema {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column()
  image: string

  @ManyToOne(() => UserSchema, (user) => user.boards, { onDelete: 'CASCADE'})
  owner: UserSchema

  @OneToMany(() => BadgeSchema, (badge) => badge.board, { cascade: true })
  badges: BadgeSchema[];

  @OneToMany(() => ListSchema, (list) => list.board, { cascade: true })
  lists: ListSchema[];

}
