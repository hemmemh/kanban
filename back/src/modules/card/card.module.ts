import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardSchema } from 'src/schemas/card.schema';
import { ListModule } from '../list/list.module';

@Module({
  controllers: [CardController],
  providers: [CardService],
  imports: [
    TypeOrmModule.forFeature([CardSchema]),
    ListModule,
  ],
})
export class CardModule {}
