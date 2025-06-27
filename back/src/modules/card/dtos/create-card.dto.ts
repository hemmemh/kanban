import { ApiProperty } from "@nestjs/swagger"

export class CreateCardDTO {

  @ApiProperty({ example: 'задача-1', description: 'Имя карточки' })
  name:string

  @ApiProperty({ example: '#fff', description: 'Цвет карточки' })
  color:string

  @ApiProperty({ example: 0, description: 'Позиция карточки' })
  pos:number

  @ApiProperty({ example: 1, description: 'ID колонки' })
  listId:number

}