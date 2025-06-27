import { ApiProperty } from "@nestjs/swagger"

export class UpdateBoardDTO {

  @ApiProperty({ example: '1', description: 'ID доски' })
  id:number
  @ApiProperty({ example: 'доска-обновлена', description: 'Новое имя доски' })
  name:string
  @ApiProperty({ example: 'adw32-обновленное.jpeg', description: 'Имя изображения' })
  image:string
}