import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ListSchema } from './list.schema';
import { BadgeSchema } from './badge.schema';
import { UserSchema } from './user.schema';



@Entity()
export class CardSchema {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column()
  color: string

  @Column()
  pos: number

  @Column()
  listId: number;
  
  @ManyToOne(() => ListSchema, (list) => list.cards, { onDelete: 'CASCADE'})
  list: ListSchema

  @ManyToMany(() => BadgeSchema, (badge) => badge.cards, { cascade: true })
  @JoinTable()
  badges: BadgeSchema[];

  @ManyToMany(() => UserSchema, (user) => user.cards, { cascade: true })
  @JoinTable()
  members: UserSchema[];



}
