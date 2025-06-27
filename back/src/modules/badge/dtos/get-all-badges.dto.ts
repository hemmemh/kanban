import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNumber, IsOptional } from "class-validator"

export class GetAllBadgesDTO {

  @ApiPropertyOptional({ example: 1, description: 'ID доски' })
  @IsOptional()
  @IsNumber()
  boardId?:number



}