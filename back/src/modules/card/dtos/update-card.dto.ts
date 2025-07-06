import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"


export class UpdateCardDTO {

  @ApiProperty({ example: '1', description: 'ID карточки' })
  @IsNumber()
  id:number

  @ApiProperty({ example: 'задача-1-обновлена', description: 'Имя карточки' })
  @IsString()
  name:string

  @ApiProperty({ example: 'задача-1-описание', description: 'описание карточки' })
  @IsString()
  desc:string

  @ApiProperty({ example: '#f2f', description: 'Цвет карточки' })
  @IsString()
  color:string

  @ApiProperty({ example: 1, description: 'Позиция карточки' })
  @IsNumber()
  pos:number

  @ApiProperty({ example: 1, description: 'ID листа' })
  @IsNumber()
  listId:number

}