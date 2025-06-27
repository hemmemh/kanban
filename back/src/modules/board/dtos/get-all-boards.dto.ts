import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsNumber, IsOptional } from "class-validator"

export class GetAllBoardsDTO {

  @ApiPropertyOptional({ example: 1, description: 'ID владельца' })
  @IsOptional()
  @IsNumber()
  ownerId?:number



}