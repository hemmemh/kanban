import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CardSchema } from './card.schema';
import { BoardSchema } from './board.schema';


@Entity()
export class BadgeSchema {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column()
  color: string

  @ManyToOne(() => BoardSchema, (board) => board.badges, { onDelete: 'CASCADE'})
  board: BoardSchema

  @ManyToMany(() => CardSchema, (card) => card.badges, { onDelete: 'CASCADE'})
  cards: CardSchema[]



}
