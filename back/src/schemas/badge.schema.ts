import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CardSchema } from './card.schema';


@Entity()
export class BadgeSchema {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column()
  color: string

  @ManyToMany(() => CardSchema, (card) => card.badges, { onDelete: 'CASCADE'})
  cards: CardSchema[]



}
