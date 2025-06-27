import { ApiProperty } from "@nestjs/swagger"

export class CreateBoardDTO {

  @ApiProperty({ example: 'доска-1', description: 'Имя доски' })
  name:string

  @ApiProperty({ example: '1', description: 'ID владельца' })
  ownerId:number

  @ApiProperty({ example: 'adw32.jpeg', description: 'Имя изображения' })
  image:string
}