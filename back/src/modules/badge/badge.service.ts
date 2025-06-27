import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadgeSchema } from 'src/schemas/badge.schema';
import { Repository } from 'typeorm';
import { CardService } from '../card/card.service';
import { CreateBadgeDTO } from './dtos/create-badge.dto';
import { CardSchema } from 'src/schemas/card.schema';
import { UpdateBadgeDTO } from './dtos/update-badge.dto';
import { GetAllBadgesDTO } from './dtos/get-all-badges.dto';

@Injectable()
export class BadgeService {

    
    constructor(
        @InjectRepository(BadgeSchema)
        private badgeSchema: Repository<BadgeSchema>,
        private cardService:CardService
      ) {}

      async create(dto:CreateBadgeDTO){  
          const cards:CardSchema[] = []
          if(dto.cardId){
             const card = await this.cardService.getByID(dto.cardId)
             if(!card){
               throw new BadRequestException('Не удалось найти карточку');
             }
             cards.push(card)
          }
         
            const createBadge = this.badgeSchema.create({
              name:dto.name,
              color:dto.color,
              cards
            }) 
            
            try {
              const response =  await this.badgeSchema.save(createBadge)
              const badge = await this.badgeSchema.findOne({where:{id:response.id}})
              return badge
            } catch (error) {
                  throw new BadRequestException(`Не удалось создать метку: ${error?.message || ''}`);
            }
          
          }
    
        async update(dto:UpdateBadgeDTO){
    
          const finded =  await this.badgeSchema.findOne({where:{id:dto.id}})
            if(!finded){
                 throw new NotFoundException('Не удалось найти метку');
             }
             try {
               await this.badgeSchema.save({...finded, ...dto})  
               const badge = await this.badgeSchema.findOne({where:{id:dto.id}})
               return badge
             } catch (error) {
               throw new BadRequestException(`Не удалось обновить метку: ${error?.message || ''}`);
             }
        }
        
        async delete(id:number){
            const finded =  await this.badgeSchema.findOne({where:{id}})
            if(!finded){
                 throw new NotFoundException('Не удалось найти метку');
             }
             try {
                await this.badgeSchema.delete({id})
               return  finded
             } catch (error) {
               throw new BadRequestException(`Не удалось удалить метку: ${error?.message || ''}`);
             }
          
        } 
    
        async getByID(id:number){
            const response =  await this.badgeSchema.findOne({where:{id}})
            return response
      }

      async getAll(dto:GetAllBadgesDTO){
        try {
        const query = this.badgeSchema.createQueryBuilder('badges')

        if(dto.boardId){
            query.andWhere('badges.boardId = :boardId', {boardId:dto.boardId})
        }
        return await query.getMany()
        } catch (error) {
            throw new BadRequestException(`Не удалось получить метки: ${error?.message || ''}`)
        }

      }


}
