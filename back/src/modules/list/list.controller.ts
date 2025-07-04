import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDTO } from './dtos/create-list.dto';
import { UpdateListDTO } from './dtos/update-list.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetAllListsDTO } from './dtos/get-all-list.dto';

@ApiTags('lists')
@Controller('list')
export class ListController {

      constructor(private listService:ListService) {}
    
        @Post('/create')
        create(@Body() dto:CreateListDTO) {
          return this.listService.create(dto);
        }
    
        @Patch('/update')
        update(@Body() dto:UpdateListDTO) {
          return this.listService.update(dto);
        }
    
        @Delete('/delete/:id')
        delete(@Param('id', ParseIntPipe) id:number) {
          return this.listService.delete(id)
        }

        @Get('/getAll')
        getAll(@Query() query:GetAllListsDTO){
           return this.listService.getAll(query)
        }


}
