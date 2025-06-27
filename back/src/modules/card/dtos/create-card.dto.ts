import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateCardDTO {

  @ApiProperty({ example: 'задача-1', description: 'Имя карточки' })
  @IsString()
  name:string

  @ApiProperty({ example: '#fff', description: 'Цвет карточки' })
  @IsString()
  color:string

  @ApiProperty({ example: 0, description: 'Позиция карточки' })
  @IsNumber()
  pos:number

  @ApiProperty({ example: 1, description: 'ID колонки' })
  @IsNumber()
  listId:number

}