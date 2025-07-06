import { ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNumber, IsOptional } from "class-validator"

export class GetAllCardsDTO {

  @ApiPropertyOptional({ example: 1, description: 'ID владельца' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  boardId?:number



}