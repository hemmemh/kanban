import { Module } from '@nestjs/common';
import { BadgeController } from './badge.controller';
import { BadgeService } from './badge.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadgeSchema } from 'src/schemas/badge.schema';
import { CardModule } from '../card/card.module';

@Module({
  controllers: [BadgeController],
  providers: [BadgeService],
  imports: [
    TypeOrmModule.forFeature([BadgeSchema]),
    CardModule,
  ],
})
export class BadgeModule {}
