import { ApiPropertyOptional } from "@nestjs/swagger"

export class GetAllBoardsDTO {

  @ApiPropertyOptional({ example: 1, description: 'ID владельца' })
  ownerId?:number



}