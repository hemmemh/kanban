import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardSchema } from 'src/schemas/card.schema';
import { Repository } from 'typeorm';
import { ListService } from '../list/list.service';
import { CreateCardDTO } from './dtos/create-card.dto';
import { UpdateCardDTO } from './dtos/update-card.dto';

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
        
              const finded =  await this.cardSchema.findOne({where:{id:dto.id}})
                if(!finded){
                     throw new NotFoundException('Не удалось найти карточку');
                 }
                 try {
                   await this.cardSchema.save({...finded, ...dto})  
                   const card = await this.cardSchema.findOne({where:{id:dto.id}})
                   return card
                 } catch (error) {
                   throw new BadRequestException(`Не удалось обновить карточку: ${error?.message || ''}`);
                 }
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
        
              async getByID(id:number){
                const response =  await this.cardSchema.findOne({where:{id}})
                return response
          }


}
