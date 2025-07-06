import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateListDTO } from './dtos/create-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ListSchema } from 'src/schemas/list.schema';
import { And, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { BoardService } from '../board/board.service';
import { UpdateListDTO } from './dtos/update-list.dto';
import { GetAllListsDTO } from './dtos/get-all-list.dto';

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
        let  els:ListSchema[] = []

          const finded =  await this.listSchema.findOne({where:{id:dto.id}})
            if(!finded){
                 throw new NotFoundException('Не удалось найти лист');
             }
             try {
               await this.listSchema.save({...finded, ...dto})  
               const list = await this.listSchema.findOne({where:{id:dto.id}})
               list && els.push(list)
                if (dto.pos !== finded.pos && list) {
                      els = els.concat(await this.updateListsByPrevList(list, finded.pos))
                }

                
                return els
               
            
             } catch (error) {
               throw new BadRequestException(`Не удалось обновить лист: ${error?.message || ''}`);
             }
        }



        private async  updateListsByPrevList(list:ListSchema, prevPos:number){
          try {
            const els:ListSchema[] = []
                 if(list.pos < prevPos){
                               const lists = await this.listSchema.find({
                               where:{
                                boardId:list.boardId, 
                                id:Not(list.id), 
                                pos:And(MoreThanOrEqual(list.pos), LessThan(prevPos)),
                                
                              },
                              order: { pos: 'ASC' },
                              })
        
                              for(const list of lists){
                               const el = await this.listSchema.save({...list, pos:list.pos + 1})  
                               els.push(el)
                             }
        
                            } else{
        
                             const lists = await this.listSchema.find({
                              where:{
                                boardId:list.boardId, 
                                id:Not(list.id),  
                                pos: And(MoreThan(prevPos), LessThanOrEqual(list.pos)),
                                
                              },
                              order: { pos: 'ASC' },
                            })
        
                               for(const list of lists){
                               const el = await this.listSchema.save({...list, pos:list.pos - 1})  
                               els.push(el)
                             }
                            }

                            return els
              } catch (error) {
                 throw new InternalServerErrorException(`Не удалось обновить позиции последующих колонок: ${error?.message || ''}`);
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

              async getAll(dto:GetAllListsDTO){
                try {
                const query = this.listSchema.createQueryBuilder('lists')
                query.orderBy('lists.pos',"ASC")
        
                if(dto.boardId){
                    query.andWhere('lists.boardId = :boardId', {boardId:dto.boardId})
                }
      
                return await query.getMany()
                
                } catch (error) {
                    throw new BadRequestException(`Не удалось получить листы: ${error?.message || ''}`)
                }
        
              }

      

}
