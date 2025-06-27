import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateListDTO {

  @ApiProperty({ example: 'колонка-1', description: 'Имя колонки' })
  @IsString()
  name:string

  @ApiProperty({ example: '#fff', description: 'Цвет колонки' })
  @IsString()
  color:string

  @ApiProperty({ example: 0, description: 'Позиция колонки' })
  @IsNumber()
  pos:number

  @ApiProperty({ example: 1, description: 'ID доски' })
  @IsNumber()
  boardId:number

}