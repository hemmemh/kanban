import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BadgeService } from './badge.service';
import { CreateBadgeDTO } from './dtos/create-badge.dto';
import { UpdateBadgeDTO } from './dtos/update-badge.dto';

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
}
