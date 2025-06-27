import { ApiProperty } from "@nestjs/swagger"

export class GetAllBadgesDTO {

  @ApiProperty({ example: 1, description: 'ID доски' })
  boardId?:number



}