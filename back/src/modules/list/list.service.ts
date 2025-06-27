import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDTO } from './dtos/create-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ListSchema } from 'src/schemas/list.schema';
import { Repository } from 'typeorm';
import { BoardService } from '../board/board.service';
import { UpdateListDTO } from './dtos/update-list.dto';

@Injectable()
export class ListService {

    constructor(
        @InjectRepository(ListSchema)
        private listSchema: Repository<ListSchema>,
        private boardService:BoardService
      ) {}

      async create(dto:CreateListDTO){  
             const board = await this.boardService.getByID(dto.boardId)
             if(!board){
               throw new BadRequestException('Не удалось найти доску');
             }
            const createList = this.listSchema.create({
              name:dto.name,
              color:dto.color,
              pos:dto.pos,
              board
            }) 
            
            try {
              const response =  await this.listSchema.save(createList)
              const list = await this.listSchema.findOne({where:{id:response.id}})
              return list
            } catch (error) {
                  throw new BadRequestException(`Не удалось создать лист: ${error?.message || ''}`);
            }
          
          }
    
        async update(dto:UpdateListDTO){
    
          const finded =  await this.listSchema.findOne({where:{id:dto.id}})
            if(!finded){
                 throw new NotFoundException('Не удалось найти лист');
             }
             try {
               await this.listSchema.save({...finded, ...dto})  
               const list = await this.listSchema.findOne({where:{id:dto.id}})
               return list
             } catch (error) {
               throw new BadRequestException(`Не удалось обновить лист: ${error?.message || ''}`);
             }
        }
        
        async delete(id:number){
            const finded =  await this.listSchema.findOne({where:{id}})
            if(!finded){
                 throw new NotFoundException('Не удалось найти лист');
             }
             try {
                await this.listSchema.delete({id})
               return  finded
             } catch (error) {
               throw new BadRequestException(`Не удалось удалить лист: ${error?.message || ''}`);
             }
          
        } 
    
          async getByID(id:number){
            const response =  await this.listSchema.findOne({where:{id}})
            return response
      }

}
