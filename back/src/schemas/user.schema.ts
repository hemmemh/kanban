import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { BoardSchema } from './board.schema';
import { CardSchema } from './card.schema';


@Entity()
export class UserSchema {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => BoardSchema, (board) => board.owner, { cascade: true })
  boards:BoardSchema[];

  @ManyToMany(() => CardSchema, (card) => card.members, { onDelete: 'CASCADE'})
  cards: CardSchema[];
 
}
