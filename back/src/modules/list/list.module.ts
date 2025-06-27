import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListSchema } from 'src/schemas/list.schema';
import { BoardModule } from '../board/board.module';

@Module({
  controllers: [ListController],
  providers: [ListService],
  imports: [
    TypeOrmModule.forFeature([ListSchema]),
    BoardModule,
  ],

})
export class ListModule {}
