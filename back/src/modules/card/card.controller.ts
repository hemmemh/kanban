import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CardService } from './card.service';
import { CreateCardDTO } from './dtos/create-card.dto';
import { UpdateCardDTO } from './dtos/update-card.dto';

@ApiTags('cards')
@Controller('card')
export class CardController {

    
 constructor(private cardService:CardService) {}
    
        @Post('/create')
        create(@Body() dto:CreateCardDTO) {
          return this.cardService.create(dto);
        }
    
        @Patch('/update')
        update(@Body() dto:UpdateCardDTO) {
          return this.cardService.update(dto);
        }
    
        @Delete('/delete/:id')
        delete(@Param('id', ParseIntPipe) id:number) {
          return this.cardService.delete(id)
        }
}
