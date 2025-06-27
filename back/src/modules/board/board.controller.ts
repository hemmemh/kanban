import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDTO } from './dtos/create-board.dto';
import { UpdateBoardDTO } from './dtos/update-board.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetAllBoardsDTO } from './dtos/get-all-boards.dto';

@ApiTags('boards')
@Controller('board')
export class BoardController {

    constructor(private boardService:BoardService) {}

     @Post('/create')
    create(@Body() dto:CreateBoardDTO) {
      return this.boardService.create(dto);
    }

    @Patch('/update')
    update(@Body() dto:UpdateBoardDTO) {
      return this.boardService.update(dto);
    }

    @Delete('/delete/:id')
    delete(@Param('id', ParseIntPipe) id:number) {
      return this.boardService.delete(id)
    }

    @Get('/getAll')
    getAll(@Query() query:GetAllBoardsDTO){
       return this.boardService.getAll(query)
    }

}
