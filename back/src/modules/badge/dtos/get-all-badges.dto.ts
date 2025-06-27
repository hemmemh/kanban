import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class GetAllBadgesDTO {

  @ApiPropertyOptional({ example: 1, description: 'ID доски' })
  boardId?:number



}