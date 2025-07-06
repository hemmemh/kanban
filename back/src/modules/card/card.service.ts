import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardSchema } from 'src/schemas/card.schema';
import { And, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { ListService } from '../list/list.service';
import { CreateCardDTO } from './dtos/create-card.dto';
import { UpdateCardDTO } from './dtos/update-card.dto';
import { GetAllCardsDTO } from './dtos/get-all-cards.dto';

@Injectable()
export class CardService {


        constructor(
            @InjectRepository(CardSchema)
            private cardSchema: Repository<CardSchema>,
            private listService:ListService
          ) {}
    
          async create(dto:CreateCardDTO){  
                 const list = await this.listService.getByID(dto.listId)
                 if(!list){
                   throw new BadRequestException('Не удалось найти колонку');
                 }
                const createCard = this.cardSchema.create({
                  name:dto.name,
                  color:dto.color,
                  pos:dto.pos,
                  list
                }) 
                
                try {
                  const response =  await this.cardSchema.save(createCard)
                  const card = await this.cardSchema.findOne({where:{id:response.id}})
                  return card
                } catch (error) {
                      throw new BadRequestException(`Не удалось создать карточку: ${error?.message || ''}`);
                }
              
              }
        
            async update(dto:UpdateCardDTO){
              let  els:CardSchema[] = []
              const finded =  await this.cardSchema.findOne({where:{id:dto.id}})
                if(!finded){
                     throw new NotFoundException('Не удалось найти карточку');
                 }
                 try {
                   await this.cardSchema.save({...finded, ...dto})  
                 
                   const card = await this.cardSchema.findOne({where:{id:dto.id}})
                    card && els.push(card)
                    if (dto.pos !== finded.pos && card && dto.listId === finded.listId) {
                     els = els.concat(await this.updateCardsByPrevCard(card, finded.pos))
                    }

                    if(dto.listId !== finded.listId && card){
                      console.log('$$');
                      
                           els = els.concat(await this.updatePrevListCardsAndCurrentListCards(card, finded.listId, finded.pos))
                           
                    }
                   return els
                 } catch (error) {
                   throw new BadRequestException(`Не удалось обновить карточку: ${error?.message || ''}`);
                 }
            }

          private async updateCardsByPrevCard(card: CardSchema, prevPos: number): Promise<CardSchema[]> {
  try {
    const els: CardSchema[] = [];

    if (card.pos < prevPos) {
      const cards = await this.cardSchema.find({
        where: {
          listId: card.listId,
          id: Not(card.id),
          pos: And(MoreThanOrEqual(card.pos), LessThan(prevPos)),
        },
        order: { pos: 'ASC' },
      });

      console.log('cards', cards, card);
      

      for (const c of cards) {
        const updated = await this.cardSchema.save({ ...c, pos: c.pos + 1 });
        els.push(updated);
      }

    } else if (card.pos > prevPos) {
      const cards = await this.cardSchema.find({
        where: {
          listId: card.listId,
          id: Not(card.id),
          pos: And(MoreThan(prevPos), LessThanOrEqual(card.pos)),
        },
        order: { pos: 'DESC' },
      });

      for (const c of cards) {
        const updated = await this.cardSchema.save({ ...c, pos: c.pos - 1 });
        els.push(updated);
      }
    }

    return els;
  } catch (error) {
    throw new InternalServerErrorException(
      `Не удалось обновить позиции карточек: ${error?.message || ''}`,
    );
  }
}

        private   async updatePrevListCardsAndCurrentListCards(card: CardSchema, prevListId:number, prevPos:number){
             const els: CardSchema[] = [];
  
       
             const prevListCards = await this.cardSchema.find({
              where:{
                listId: prevListId,
                id: Not(card.id),
                pos: MoreThan(prevPos),
              }
             })
             
            const currentListCards = await this.cardSchema.find({
              where:{
                listId: card.listId,
                 id: Not(card.id),
                pos: MoreThanOrEqual(card.pos),
              }
             }) 

             for(const prevCard of prevListCards){
              const updated = await this.cardSchema.save({ ...prevCard, pos: prevCard.pos - 1 });
               els.push(updated);
             }

            for(const currentCard of currentListCards){
              const updated = await this.cardSchema.save({ ...currentCard, pos:currentCard.pos + 1 });
               els.push(updated);
             }

              return els
          }
            
            async delete(id:number){
                const finded =  await this.cardSchema.findOne({where:{id}})
                if(!finded){
                     throw new NotFoundException('Не удалось найти карточку');
                 }
                 try {
                    await this.cardSchema.delete({id})
                   return  finded
                 } catch (error) {
                   throw new BadRequestException(`Не удалось удалить карточку: ${error?.message || ''}`);
                 }
              
            } 



            async getAll(dto:GetAllCardsDTO){
              try {
              const query = this.cardSchema.createQueryBuilder('cards')
              query.leftJoin('cards.list', 'list')
      
              if(dto.boardId){
                query.andWhere('list.boardId = :boardId', {boardId:dto.boardId})
              }
    
              return await query.getMany()
              
              } catch (error) {
                  throw new BadRequestException(`Не удалось получить карточки: ${error?.message || ''}`)
              }
      
            }
        
              async getByID(id:number){
                const response =  await this.cardSchema.findOne({where:{id}})
                return response
          }


}
