import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardSchema } from 'src/schemas/board.schema';
import { Repository } from 'typeorm';
import { CreateBoardDTO } from './dtos/create-board.dto';
import { UserService } from '../user/user.service';
import { UpdateBoardDTO } from './dtos/update-board.dto';
import { GetAllBoardsDTO } from './dtos/get-all-boards.dto';
import { join } from 'path';
import { readdirSync } from 'fs';

@Injectable()
export class BoardService {

    constructor(
        @InjectRepository(BoardSchema)
        private boardSchema: Repository<BoardSchema>,
        private userService:UserService
      ) {}


     async create(dto:CreateBoardDTO){  
         const owner = await this.userService.getByID(dto.ownerId)
         if(!owner){
           throw new BadRequestException('Не удалось найти пользователя');
         }
        const createBoard = this.boardSchema.create({
          name:dto.name,
          image:dto.image,
          owner,
          
        }) 
        
        try {
          const response =  await this.boardSchema.save(createBoard)
          const board = await this.boardSchema.findOne({where:{id:response.id}})
          return board
        } catch (error) {
              throw new BadRequestException(`Не удалось создать доску: ${error?.message || ''}`);
        }
      
      }

    async update(dto:UpdateBoardDTO){

      const finded =  await this.boardSchema.findOne({where:{id:dto.id}})
        if(!finded){
             throw new NotFoundException('Не удалось найти доску');
         }
         try {
           await this.boardSchema.save({...finded, ...dto})  
           const board = await this.boardSchema.findOne({where:{id:dto.id}})
           return board
         } catch (error) {
           throw new BadRequestException(`Не удалось обновить доску: ${error?.message || ''}`);
         }
    }
    async delete(id:number){
        const finded =  await this.boardSchema.findOne({where:{id}})
        if(!finded){
             throw new NotFoundException('Не удалось найти доску');
         }
         try {
            await this.boardSchema.delete({id})
           return  finded
         } catch (error) {
           throw new BadRequestException(`Не удалось удалить доску: ${error?.message || ''}`);
         }
      
    } 

        async getByID(id:number){
              const response =  await this.boardSchema.findOne({where:{id}})
              return response
        }

        async getAll(dto:GetAllBoardsDTO){
          try {
          const query = this.boardSchema.createQueryBuilder('boards')
         
  
          if(dto.ownerId){
              query.andWhere('boards.ownerId = :ownerId', {ownerId:dto.ownerId})
          }

          return await query.getMany()
          
          } catch (error) {
              throw new BadRequestException(`Не удалось получить доски: ${error?.message || ''}`)
          }
  
        }

        async getBackImages(){
            const imagesDir = join(__dirname, '..', '..', '..', 'public', 'board-back');

            try {
                const files = readdirSync(imagesDir);

                  const images = files.filter(file =>
                      /\.(png|jpe?g|gif|webp|svg)$/i.test(file)
                  );
                  return images;
            } catch (error) {
                throw new BadRequestException(`Не удалось получить изображения: ${error?.message || ''}`);
            }
        }


}
