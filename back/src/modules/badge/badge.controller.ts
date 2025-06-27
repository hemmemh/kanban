import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BadgeService } from './badge.service';
import { CreateBadgeDTO } from './dtos/create-badge.dto';
import { UpdateBadgeDTO } from './dtos/update-badge.dto';
import { GetAllBadgesDTO } from './dtos/get-all-badges.dto';

@ApiTags('badges')
@Controller('badge')
export class BadgeController {

 constructor(private badgeService:BadgeService) {}
    
        @Post('/create')
        create(@Body() dto:CreateBadgeDTO) {
          return this.badgeService.create(dto);
        }
    
        @Patch('/update')
        update(@Body() dto:UpdateBadgeDTO) {
          return this.badgeService.update(dto);
        }
    
        @Delete('/delete/:id')
        delete(@Param('id', ParseIntPipe) id:number) {
          return this.badgeService.delete(id)
        }

        @Get('/getAll')
        getAll(@Query() query:GetAllBadgesDTO){
           return this.badgeService.getAll(query)
        }
}
