import { ApiProperty } from "@nestjs/swagger"

export class CreateBadgeDTO {

  @ApiProperty({ example: 'метка-1', description: 'Имя метки' })
  name:string

  @ApiProperty({ example: '#fff', description: 'Цвет метки' })
  color:string

  @ApiProperty({ example: 0, description: 'Позиция метки' })
  pos:number

  @ApiProperty({ example: 1, description: 'ID карточки' })
  cardId?:number

}