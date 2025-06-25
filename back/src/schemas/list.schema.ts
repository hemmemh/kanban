import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BoardSchema } from './board.schema';
import { CardSchema } from './card.schema';


@Entity()
export class ListSchema {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column()
  color: string

  @Column()
  pos: number


  @ManyToOne(() => BoardSchema, (board) => board.lists, { onDelete: 'CASCADE'})
  board: BoardSchema

  @OneToMany(() => CardSchema, (card) => card.list, { cascade: true })
  cards: CardSchema[];



}
