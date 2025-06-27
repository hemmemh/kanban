import { ApiProperty } from "@nestjs/swagger"


export class UpdateCardDTO {

  @ApiProperty({ example: '1', description: 'ID карточки' })
  id:number

  @ApiProperty({ example: 'задача-1-обновлена', description: 'Имя карточки' })
  name:string

  @ApiProperty({ example: '#f2f', description: 'Цвет карточки' })
  color:string

  @ApiProperty({ example: 1, description: 'Позиция карточки' })
  pos:number

}