import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardSchema } from 'src/schemas/board.schema';
import { UserModule } from '../user/user.module';

@Module({
  providers: [BoardService],
  controllers: [BoardController],
  imports: [
    TypeOrmModule.forFeature([BoardSchema]),
    UserModule,
  ],
   exports: [BoardService],
})
export class BoardModule {}
